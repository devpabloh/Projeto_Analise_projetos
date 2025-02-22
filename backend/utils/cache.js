import NodeCache from 'node-cache';
import { logger } from './logger.js';

class CacheError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CacheError';
    }
}

const cache = new NodeCache({
    stdTTL: 600,
    checkperiod: 120,
    useClones: false,
    errorOnMissing: false,
    maxKeys: 1000
});

export const cacheManager = {
    async getOrSet(key, fetchFunction, ttl = 600) {
        try {
            if (!key) {
                throw new CacheError('Cache key is required');
            }

            const cachedData = cache.get(key);
            if (cachedData !== undefined) {
                logger.logToFile(`Cache hit for key: ${key}`, 'cache');
                return cachedData;
            }

            logger.logToFile(`Cache miss for key: ${key}`, 'cache');
            const freshData = await fetchFunction();

            if (freshData === undefined) {
                logger.logToFile(`Warning: Undefined data for key: ${key}`, 'cache');
                return null;
            }

            const success = cache.set(key, freshData, ttl);
            if (!success) {
                logger.logToFile(`Failed to set cache for key: ${key}`, 'cache');
            }

            return freshData;
        } catch (error) {
            logger.logToFile(`Cache error for key ${key}: ${error.message}`, 'error');
            if (error instanceof CacheError) {
                throw error;
            }
            throw new CacheError(`Cache operation failed: ${error.message}`);
        }
    },

    invalidate(key) {
        try {
            if (!key) {
                throw new CacheError('Key is required for invalidation');
            }
            const success = cache.del(key);
            logger.logToFile(`Cache invalidated for key: ${key} (Success: ${success})`, 'cache');
            return success;
        } catch (error) {
            logger.logToFile(`Error invalidating cache for key ${key}: ${error.message}`, 'error');
            throw new CacheError(`Failed to invalidate cache: ${error.message}`);
        }
    },

    invalidatePattern(pattern) {
        try {
            if (!pattern) {
                throw new CacheError('Pattern is required for invalidation');
            }
            const keys = cache.keys();
            const removedKeys = keys.filter(key => key.includes(pattern));
            let count = 0;
            
            removedKeys.forEach(key => {
                if (cache.del(key)) count++;
            });

            logger.logToFile(`Cache invalidated for pattern: ${pattern} (Removed: ${count} keys)`, 'cache');
            return count;
        } catch (error) {
            logger.logToFile(`Error invalidating cache pattern ${pattern}: ${error.message}`, 'error');
            throw new CacheError(`Failed to invalidate cache pattern: ${error.message}`);
        }
    },

    clear() {
        try {
            const keysCount = cache.keys().length;
            cache.flushAll();
            logger.logToFile(`Cache cleared completely (Removed ${keysCount} keys)`, 'cache');
            return keysCount;
        } catch (error) {
            logger.logToFile(`Error clearing cache: ${error.message}`, 'error');
            throw new CacheError('Failed to clear cache');
        }
    },

    getStats() {
        try {
            const stats = cache.getStats();
            const keys = cache.keys();
            return {
                ...stats,
                currentKeys: keys.length,
                keys: keys,
                memoryUsage: process.memoryUsage().heapUsed
            };
        } catch (error) {
            logger.logToFile(`Error getting cache stats: ${error.message}`, 'error');
            throw new CacheError('Failed to get cache statistics');
        }
    },

    async mget(keys) {
        try {
            if (!Array.isArray(keys)) {
                throw new CacheError('Keys must be an array');
            }
            return cache.mget(keys);
        } catch (error) {
            logger.logToFile(`Error in bulk get operation: ${error.message}`, 'error');
            throw new CacheError('Failed to perform bulk get operation');
        }
    },

    async mset(keyValuePairs, ttl = 600) {
        try {
            if (!keyValuePairs || typeof keyValuePairs !== 'object') {
                throw new CacheError('Key-value pairs must be an object');
            }
            return cache.mset(Object.entries(keyValuePairs).map(([key, value]) => ({
                key,
                val: value,
                ttl
            })));
        } catch (error) {
            logger.logToFile(`Error in bulk set operation: ${error.message}`, 'error');
            throw new CacheError('Failed to perform bulk set operation');
        }
    }
};

// Cache monitoring
setInterval(() => {
    try {
        const stats = cacheManager.getStats();
        logger.logToFile(`Cache stats: ${JSON.stringify({
            hits: stats.hits,
            misses: stats.misses,
            keys: stats.currentKeys,
            memoryUsage: `${Math.round(stats.memoryUsage / 1024 / 1024)}MB`
        })}`, 'cache');
    } catch (error) {
        logger.logToFile(`Error monitoring cache: ${error.message}`, 'error');
    }
}, 3600000);

// Handle cache errors
cache.on('error', (error) => {
    logger.logToFile(`Cache error event: ${error.message}`, 'error');
});

export default cacheManager;