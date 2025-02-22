import knex from 'knex';
import knexConfig from '../knexfile.js';

const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment];

const connection = knex(config);

// Teste de conexão
connection.raw('SELECT 1')
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
        process.exit(1);
    });

export default connection;