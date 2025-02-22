import { logger } from '../utils/logger.js';

export const logRequest = (req, res, next) => {
    const logData = logger.formatRequestLog(req);
    
    // Log to console
    console.log(`[${logData.timestamp}] ${logData.method} ${logData.url}`);
    
    if (logData.body) {
        console.log('Body:', JSON.stringify(logData.body, null, 2));
    }
    
    if (logData.params) {
        console.log('Params:', logData.params);
    }
    
    if (logData.query) {
        console.log('Query:', logData.query);
    }

    // Log to file
    logger.logToFile(JSON.stringify(logData), 'request');

    // Capture response
    const oldSend = res.send;
    res.send = function (data) {
        // Log response
        logger.logToFile(JSON.stringify({
            request: `${logData.method} ${logData.url}`,
            response: data,
            statusCode: res.statusCode
        }), 'response');

        oldSend.apply(res, arguments);
    };

    next();
};