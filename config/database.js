const mysql = require('mysql2');

const db = mysql.createPool({
	host: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER || 'root',
	password: process.env.DB_PASS || 'root',
	database: process.env.DB_BASE || 'swrpg-app',
	port: process.env.DB_PORT || 8889,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
});

module.exports = db;
