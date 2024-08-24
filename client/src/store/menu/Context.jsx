import { createContext, useState } from "react";
import PropTypes from "prop-types";

// Create a context for managing the menu state
const Context = createContext();

// MenuProvider component to provide the menu state and functions across the app
function MenuProvider({ children }) {
	// State to track whether the menu is open or closed
	const [isMenuOpen, setIsMenuOpen] = useState(null);

    // Function to toggle the menu open or closed
    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen); // Invert the current state of isMenuOpen
    }

	return (
		// Provide the menu state and toggle function to any component that consumes this context
		<Context.Provider value={{ isMenuOpen, toggleMenu }}>
			{children} {/* Render the children components */}
		</Context.Provider>
	);
}

// PropTypes to ensure children prop is passed and is a valid React node
MenuProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

// Export the context and provider for use in other parts of the app
export { Context, MenuProvider };

