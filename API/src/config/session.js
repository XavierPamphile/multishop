import { createRequire } from "module";
import session from "express-session";
import pool from "./db.js";  // Import the MySQL database configuration.
const require = createRequire(import.meta.url);
const MySQLStore = require("express-mysql-session")(session);

// MySQL session store configuration to store sessions in the database.

const sessionStore = new MySQLStore(
	{
		clearExpired: true, // Clean up expired sessions.
		checkExpirationInterval: 900000, // Interval to check for expired sessions (15 minutes).
		expiration: 3600000, // Session lifespan (1 hour).
	},
	pool
);

const newSession = session({
	name: "session_id", // Name of the session cookie.
	secret: process.env.SECRET_SESSION, // Secret to sign the session cookie.
	resave: false, // Do not re-save the session if it hasn't been modified.
	saveUninitialized: false, // Do not save uninitialized sessions.
	store: sessionStore, // Use the MySQL session store.
	cookie: {
		secure: false,
		httpOnly: true,
		sameSite: "lax",
		maxAge: 3600000,
		domain: "localhost",
	},
	rolling: true, // Reset the cookie's expiration time on each request.
});

export default newSession;
