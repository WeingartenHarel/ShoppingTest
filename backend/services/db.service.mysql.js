const knex = require('knex');
const config = require('../config');

const knexInstance = knex({
    client: 'mysql',
    connection: {
        host: config.Server,
        user: config.Username,
        database: config.dbName,
        password: config.Password,
    },
});

module.exports = knexInstance;

// Close the connection pool when the Node.js process exits
process.on('SIGINT', () => {
    knexInstance.destroy().then(() => {
        process.exit(0);
    }).catch((err) => {
        console.error('Error closing the MySQL pool:', err.message);
        process.exit(1);
    });
});
