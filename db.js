const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mov',
    password: '12345',
    port: 5432,
});

pool.connect()
    .then(() => console.log('Подключение успешно!'))
    .catch(err => console.error('Ошибка подключения:', err));

module.exports = pool;
