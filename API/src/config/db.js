import mysql from "mysql2/promise";

// Configuration for connecting to the MySQL database.
// Uses connection parameters to establish communication with the database server.

const pool = mysql.createPool({
	host: process.env.DB_HOST, // MySQL server hostname.
	database: process.env.DB_NAME, // MySQL database name.
	user: process.env.DB_USER, // MySQL username.
	password: process.env.DB_PASS, // MySQL password.
	waitForConnections: true, // Default value.
	connectionLimit: 10, // Default value. Maximum number of connections in the pool.
	queueLimit: 0, // Default value.
});

pool.getConnection()
	.then((res) => {
		console.log("Connected to the database " + res.config.database);
		pool.releaseConnection(res);
	})
	.catch((err) =>
		console.error("Error connecting to the database " + err.message)
	);

export default pool;

