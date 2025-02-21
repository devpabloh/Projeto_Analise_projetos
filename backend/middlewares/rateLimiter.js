import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limite de 100 requisições por IP
    message: {
        success: false,
        error: 'Muitas requisições. Por favor, tente novamente mais tarde.'
    },
    standardHeaders: true,
    legacyHeaders: false
});