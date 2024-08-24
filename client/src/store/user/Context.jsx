import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { reducer, initialState } from "./reducer"; // Import the reducer function and the initial state
import UseMenu from "../../hooks/useMenu"; // Import the useMenu hook

// Create a context for the user
const Context = createContext();

// UserProvider component to provide the user state and functions across the app
function UserProvider({ children }) {
	const { toggleMenu } = UseMenu(); // Retrieve the toggleMenu function from the useMenu hook
    const [user, dispatch] = useReducer(reducer, initialState); // Use the useReducer hook with the reducer and initial state
    const navigate = useNavigate(); // Hook to navigate programmatically

    // Function to handle user login
    async function login(data) {
        dispatch({ type: 'LOGIN', payload: data }); // Dispatch a LOGIN action with the user data as payload
    }

    // Function to handle user logout
    async function logout() {
        // Make a request to the logout endpoint to log the user out
        const response = await fetch(
            "http://localhost:9000/api/v1/auth/logout",
			{
                credentials: "include", // Include cookies with the request
			}
		);
		if (response.ok) {
            dispatch({ type: 'LOGOUT' }); // Dispatch a LOGOUT action if the response is successful
            toggleMenu(); // Close the menu after logout
            navigate("/"); // Redirect the user to the home page
		}
    }

	return (
		<Context.Provider value={{ user, login, logout }}>
			{children} {/* Render the children components */}
		</Context.Provider>
	);
}

// PropTypes to ensure children prop is passed and is a valid React node
UserProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

// Export the context and provider for use in other parts of the app
export { Context, UserProvider };
