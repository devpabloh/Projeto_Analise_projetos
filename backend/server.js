import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import projectRoutes from './routes/projects.js';
import { errorHandler } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json({ limit: '10kb' }));
app.use(apiLimiter);

// Routes
app.use('/api/projects', projectRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});