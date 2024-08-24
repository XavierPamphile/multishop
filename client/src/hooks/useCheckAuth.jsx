import { useEffect, useState } from "react";
import { useUser } from "./useUser";

function useCheckAuth() {
    const { user, login } = useUser();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchAuthentication() {
			try {
				const response = await fetch(
					"http://localhost:9000/api/v1/auth",
					{
                        // In the request, cookies are sent so that the server can use them to verify the connection status.
						credentials: "include",
					}
				);
                // If the server returns a 401 status, it means the user is not logged in, so we stop the function with a return statement.
				if (response.status === 401) {
					return;
				}
                // If the response is okay, we retrieve the user data sent as JSON, parse it, and store it in the state setUser, which is part of a User context.
				if (response.ok) {
					const data = await response.json();
					login(data.user);
				} 
			} catch (error) {
				console.log(`Fetch error: ${error.message}`);
			} finally {
                // The `finally` block is used to execute certain instructions regardless of the outcome (success, error, etc.).
                // Here, we stop the loading state and navigate to the appropriate route.
				setIsLoading(false);
			}
		}
        // Simulate a 2-second latency to observe the loading state on localhost.
        // setTimeout(() => {
            fetchAuthentication();
        // }, 2000);
	}, []);

    return [user, isLoading];
}

export { useCheckAuth };
