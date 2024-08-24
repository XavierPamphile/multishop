// A custom fetch function to make API requests with JSON handling and error checking.
const customFetch = async (endpoint, method, body) => {
    // Define the base API URL, falling back to localhost if not specified in environment variables.
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9000/api/v1";
    
    try {
        // Make a fetch request to the specified endpoint with the provided method and body.
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: method, // HTTP method (e.g., GET, POST, PATCH, DELETE)
            credentials: "include", // Include credentials (cookies) in the request
            headers: {
                "Content-Type": "application/json", // Expect JSON content in the request
            },
            body: JSON.stringify(body), // Convert the request body to a JSON string
        });
        
        // If the response status is not OK (e.g., 404, 500), throw an error.
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse and return the response as JSON.
        return await response.json();
    } catch (error) {
        // Log any errors encountered during the fetch operation and rethrow the error.
        console.error("Fetch error:", error);
        throw error;
    }
};

// Export the customFetch function for use in other parts of the application.
export { customFetch };
