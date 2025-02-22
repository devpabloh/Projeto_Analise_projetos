import rateLimit from 'express-rate-limit';
import { logger } from '../utils/logger.js';

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limite de 100 requisições por IP
    message: {
        success: false,
        error: 'Muitas requisições',
        message: 'Por favor, aguarde antes de fazer novas requisições'
    },
    handler: (req, res, next, options) => {
        logger.logToFile(`Rate limit excedido para IP: ${req.ip}`, 'security');
        res.status(429).json(options.message);
    }
});