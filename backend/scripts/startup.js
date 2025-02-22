import { logger } from '../utils/logger.js';
import connection from '../database/connection.js';

export async function startup() {
    try {
        // Verifica conexão com banco de dados
        await connection.raw('SELECT 1');
        logger.logToFile('Database connection established', 'system');

        // Verifica migrations pendentes
        const pendingMigrations = await connection.migrate.list();
        if (pendingMigrations[1].length > 0) {
            logger.logToFile('Running pending migrations...', 'system');
            await connection.migrate.latest();
        }

        return true;
    } catch (error) {
        logger.logToFile(`Startup error: ${error.message}`, 'error');
        throw error;
    }
}