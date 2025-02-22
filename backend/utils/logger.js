import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';
import { promisify } from 'util';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logsDir = path.join(__dirname, '../logs');
const archiveDir = path.join(logsDir, 'archive');

// Ensure logs directories exist
[logsDir, archiveDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

const gzip = promisify(zlib.gzip);
const LOG_LEVELS = {
    ERROR: 'error',
    WARN: 'warn',
    INFO: 'info',
    DEBUG: 'debug',
    SYSTEM: 'system',
    ACCESS: 'access',
    CACHE: 'cache'
};

class Logger {
    constructor() {
        this.logBuffers = new Map();
        this.flushInterval = 5000; // 5 seconds
        this.maxBufferSize = 1000; // Maximum number of logs before forced flush
        this.setupBufferFlush();
    }

    getLogFileName(type) {
        const date = new Date().toISOString().split('T')[0];
        return path.join(logsDir, `${type}_${date}.log`);
    }

    async logToFile(message, type = LOG_LEVELS.INFO) {
        try {
            const timestamp = new Date().toISOString();
            const logEntry = {
                timestamp,
                type,
                message: typeof message === 'object' ? JSON.stringify(message) : message,
                processId: process.pid
            };

            // Add to buffer
            if (!this.logBuffers.has(type)) {
                this.logBuffers.set(type, []);
            }
            this.logBuffers.get(type).push(logEntry);

            // Force flush if buffer is too large
            if (this.logBuffers.get(type).length >= this.maxBufferSize) {
                await this.flushBuffers(type);
            }

            // Console output in development
            if (process.env.NODE_ENV !== 'production') {
                console.log(`[${timestamp}][${type}] ${logEntry.message}`);
            }
        } catch (error) {
            console.error('Error writing to log file:', error);
            process.emit('logger:error', error);
        }
    }

    async flushBuffers(specificType = null) {
        const types = specificType ? [specificType] : Array.from(this.logBuffers.keys());

        for (const type of types) {
            const buffer = this.logBuffers.get(type);
            if (!buffer || buffer.length === 0) continue;

            const logFile = this.getLogFileName(type);
            const logContent = buffer.map(entry => 
                `[${entry.timestamp}][${entry.processId}] ${entry.message}\n`
            ).join('');

            try {
                await fs.promises.appendFile(logFile, logContent);
                this.logBuffers.set(type, []);
            } catch (error) {
                console.error(`Error flushing ${type} logs:`, error);
                process.emit('logger:error', error);
            }
        }
    }

    setupBufferFlush() {
        setInterval(() => this.flushBuffers(), this.flushInterval);
        process.on('SIGTERM', () => this.flushBuffers());
        process.on('SIGINT', () => this.flushBuffers());
    }

    formatRequestLog(req) {
        const { method, originalUrl, body, params, query, id } = req;
        const sanitizedBody = this.sanitizeSensitiveData(body);
        
        return {
            requestId: id,
            timestamp: new Date().toISOString(),
            method,
            url: originalUrl,
            body: Object.keys(sanitizedBody).length ? sanitizedBody : undefined,
            params: Object.keys(params).length ? params : undefined,
            query: Object.keys(query).length ? query : undefined,
            ip: req.ip,
            userAgent: req.get('user-agent'),
            headers: this.sanitizeSensitiveData(req.headers)
        };
    }

    sanitizeSensitiveData(data) {
        if (!data) return {};
        const sanitized = { ...data };
        const sensitiveFields = ['password', 'token', 'authorization', 'cookie'];
        
        Object.keys(sanitized).forEach(key => {
            if (sensitiveFields.includes(key.toLowerCase())) {
                sanitized[key] = '[REDACTED]';
            }
        });
        
        return sanitized;
    }

    async archiveOldLogs(daysToKeep = 30) {
        try {
            const files = await fs.promises.readdir(logsDir);
            const now = new Date();

            for (const file of files) {
                if (file === 'archive') continue;

                const filePath = path.join(logsDir, file);
                const stats = await fs.promises.stat(filePath);
                const daysOld = (now - stats.mtime) / (1000 * 60 * 60 * 24);

                if (daysOld > daysToKeep) {
                    const content = await fs.promises.readFile(filePath);
                    const compressed = await gzip(content);
                    const archivePath = path.join(archiveDir, `${file}.gz`);
                    
                    await fs.promises.writeFile(archivePath, compressed);
                    await fs.promises.unlink(filePath);
                    
                    await this.logToFile(`Archived log file: ${file}`, LOG_LEVELS.SYSTEM);
                }
            }
        } catch (error) {
            console.error('Error archiving logs:', error);
            process.emit('logger:error', error);
        }
    }

    async getLogStats() {
        try {
            const stats = {
                totalSize: 0,
                fileCount: 0,
                oldestLog: null,
                newestLog: null,
                logsByType: {}
            };

            const files = await fs.promises.readdir(logsDir);
            
            for (const file of files) {
                if (file === 'archive') continue;
                
                const filePath = path.join(logsDir, file);
                const fileStats = await fs.promises.stat(filePath);
                
                stats.totalSize += fileStats.size;
                stats.fileCount++;
                
                const type = file.split('_')[0];
                if (!stats.logsByType[type]) {
                    stats.logsByType[type] = 0;
                }
                stats.logsByType[type]++;

                if (!stats.oldestLog || fileStats.mtime < stats.oldestLog.date) {
                    stats.oldestLog = { file, date: fileStats.mtime };
                }
                if (!stats.newestLog || fileStats.mtime > stats.newestLog.date) {
                    stats.newestLog = { file, date: fileStats.mtime };
                }
            }

            return stats;
        } catch (error) {
            console.error('Error getting log stats:', error);
            throw error;
        }
    }
}

export const logger = new Logger();

// Archive old logs weekly
setInterval(() => {
    logger.archiveOldLogs();
}, 7 * 24 * 60 * 60 * 1000);

// Log statistics monthly
setInterval(async () => {
    try {
        const stats = await logger.getLogStats();
        await logger.logToFile({
            type: 'log_statistics',
            ...stats
        }, LOG_LEVELS.SYSTEM);
    } catch (error) {
        console.error('Error logging statistics:', error);
    }
}, 30 * 24 * 60 * 60 * 1000);