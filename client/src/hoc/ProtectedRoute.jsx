import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

// Higher-Order Component (HOC) to secure routes
// This function creates a component that takes another component and props as parameters.
function ProtectedRoute({ component: Component }) {
	// Retrieves the user data from the custom hook.
	const { user } = useUser();
	const navigate = useNavigate();

    // If the user is not logged in, redirect to the home page.
	useEffect(() => {
		if (!user.isLogged) {
			navigate("/");
		}
	}, [user]);

	// If the user is logged in, render the passed component.
	if (user.isLogged) {
		return <Component />;
	}
}

ProtectedRoute.propTypes = {
	component: PropTypes.elementType.isRequired,
};

// Export the ProtectedRoute component
export default ProtectedRoute;

