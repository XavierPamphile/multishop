import "dotenv/config"; // Loads environment variables from the.env file
import express from "express"; // Import the Express framework
import cors from "cors"; // Import the CORS middleware
import router from "./router/index.routes.js"; // Import the application's routes
import newSession from "./config/session.js"; // Import the session configuration

const app = express();

// Configure CORS options to allow client requests.
const corsOptions = cors({
	origin: "http://localhost:5173", // Allowed origin (frontend)
	credentials: true, // Allow sending cookies with CORS requests
});

app.use(corsOptions); // Use the CORS options
app.use(newSession); // Use the session management middleware
app.use(express.json()); // Middleware to parse request bodies as JSON
app.use(express.static("public")); // Middleware to serve static files from the "public" directory

app.use(router); // Use the application's routes

// Start the server on the port defined in the environment variables.
app.listen(process.env.LOCAL_PORT, () => {
	console.log(
		"Server is running at http://localhost:" + process.env.LOCAL_PORT
	);
});

