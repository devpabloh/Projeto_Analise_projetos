import { logger } from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
    // Log detailed error information
    const errorLog = {
        timestamp: new Date().toISOString(),
        path: req.path,
        method: req.method,
        error: {
            name: err.name,
            message: err.message,
            code: err.code,
            stack: err.stack
        },
        requestData: {
            body: req.body,
            params: req.params,
            query: req.query,
            headers: req.headers
        }
    };

    // Log error to file
    logger.logToFile(JSON.stringify(errorLog, null, 2), 'error');

    // Console log for development
    console.error(`[${errorLog.timestamp}] Error:`, {
        path: errorLog.path,
        method: errorLog.method,
        errorName: err.name,
        errorMessage: err.message
    });

    // Database errors
    if (err.code === '23505') {
        return res.status(409).json({
            success: false,
            error: 'Conflito de dados',
            message: 'Registro duplicado',
            timestamp: errorLog.timestamp
        });
    }

    if (err.code === '23503') {
        return res.status(400).json({
            success: false,
            error: 'Erro de referência',
            message: 'Referência inválida para usuário ou projeto',
            timestamp: errorLog.timestamp
        });
    }

    // Authentication errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            error: 'Erro de autenticação',
            message: 'Token inválido',
            timestamp: errorLog.timestamp
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            error: 'Erro de autenticação',
            message: 'Token expirado',
            timestamp: errorLog.timestamp
        });
    }

    // Validation errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            error: 'Erro de validação',
            message: err.message,
            details: err.details || [],
            timestamp: errorLog.timestamp
        });
    }

    // Rate limiting errors
    if (err.status === 429) {
        return res.status(429).json({
            success: false,
            error: 'Muitas requisições',
            message: 'Por favor, aguarde antes de fazer novas requisições',
            retryAfter: err.retryAfter || 60,
            timestamp: errorLog.timestamp
        });
    }

    // Database connection errors
    if (err.code === 'ECONNREFUSED') {
        return res.status(503).json({
            success: false,
            error: 'Erro de conexão',
            message: 'Serviço temporariamente indisponível',
            timestamp: errorLog.timestamp
        });
    }

    // File handling errors
    if (err.code === 'ENOENT') {
        return res.status(404).json({
            success: false,
            error: 'Arquivo não encontrado',
            message: 'O arquivo solicitado não existe',
            timestamp: errorLog.timestamp
        });
    }

    // Default error
    res.status(err.status || 500).json({
        success: false,
        error: err.message || 'Erro interno do servidor',
        timestamp: errorLog.timestamp,
        path: errorLog.path,
        requestId: req.id // Assuming you're using a request ID middleware
    });
};