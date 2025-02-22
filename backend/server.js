import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { v4 as uuidv4 } from 'uuid';
import projectRoutes from './routes/projects.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { apiLimiter } from './middlewares/rateLimiter.js';
import { logRequest } from './middlewares/logRequest.js';
import { logger } from './utils/logger.js';
import { startup } from './scripts/startup.js';
import config from './config/env.js';
import connection from './database/connection.js';

const app = express();

// Request ID middleware
app.use((req, res, next) => {
    req.id = uuidv4();
    res.setHeader('X-Request-Id', req.id);
    next();
});

// Security Middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", config.server.frontendUrl],
        },
    },
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: true,
    crossOriginResourcePolicy: { policy: "same-site" }
}));

app.use(cors({
    origin: config.server.frontendUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id']
}));

// Compression middleware
app.use(compression({
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            return false;
        }
        return compression.filter(req, res);
    },
    level: 6
}));

app.use(express.json({ 
    limit: '10kb',
    verify: (req, res, buf) => {
        req.rawBody = buf;
    }
}));

// Security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    next();
});

// Logging middleware
app.use(logRequest);

// Rate limiting
app.use(apiLimiter);

// Health check endpoint
app.get('/health', async (req, res) => {
    try {
        await connection.raw('SELECT 1');
        const memoryUsage = process.memoryUsage();
        res.status(200).json({ 
            status: 'UP',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            memory: {
                heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024) + 'MB',
                heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024) + 'MB'
            },
            database: 'Connected'
        });
    } catch (error) {
        res.status(503).json({
            status: 'DOWN',
            timestamp: new Date().toISOString(),
            error: 'Database connection failed'
        });
    }
});

// Routes
app.use('/api/projects', projectRoutes);

// 404 handler
app.use((req, res, next) => {
    const error = new Error('Rota não encontrada');
    error.status = 404;
    next(error);
});

// Error handler
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

let isShuttingDown = false;

async function gracefulShutdown() {
    if (isShuttingDown) return;
    isShuttingDown = true;

    logger.logToFile('Iniciando desligamento gracioso do servidor...', 'system');
    
    try {
        // Parar de aceitar novas conexões
        await new Promise((resolve) => {
            server.close(resolve);
        });
        
        // Fechar conexão com o banco
        await connection.destroy();
        logger.logToFile('Database connection closed', 'system');
        
        logger.logToFile('Servidor encerrado com sucesso', 'system');
        process.exit(0);
    } catch (error) {
        logger.logToFile(`Erro durante o shutdown: ${error.message}`, 'error');
        process.exit(1);
    }
}

let server;

// Inicialização do servidor
async function startServer() {
    try {
        await startup();
        
        const PORT = config.server.port;
        server = app.listen(PORT, () => {
            logger.logToFile(`Servidor iniciado na porta ${PORT}`, 'system');
            console.log(`Servidor rodando na porta ${PORT}`);
        });

        // Configurar timeout do servidor
        server.timeout = 30000; // 30 segundos
        server.keepAliveTimeout = 65000; // 65 segundos
        
    } catch (error) {
        logger.logToFile(`Erro na inicialização do servidor: ${error.message}`, 'error');
        process.exit(1);
    }
}

// Unhandled error handling
process.on('unhandledRejection', (reason, promise) => {
    logger.logToFile(`Unhandled Rejection at: ${promise}, reason: ${reason}`, 'error');
    throw reason;
});

process.on('uncaughtException', (error) => {
    logger.logToFile(`Uncaught Exception: ${error.message}`, 'error');
    gracefulShutdown();
});

// Memory usage monitoring
const MEMORY_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutos
setInterval(() => {
    const memoryUsage = process.memoryUsage();
    const heapUsedMB = Math.round(memoryUsage.heapUsed / 1024 / 1024);
    
    logger.logToFile(`Memory usage: ${JSON.stringify({
        heapUsed: `${heapUsedMB}MB`,
        heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
        rss: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`
    })}`, 'system');

    // Alert if memory usage is too high
    if (heapUsedMB > 1024) { // 1GB
        logger.logToFile('High memory usage detected!', 'warning');
    }
}, MEMORY_CHECK_INTERVAL);

// Iniciar servidor
startServer();

export default app;