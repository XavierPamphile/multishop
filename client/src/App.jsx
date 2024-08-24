import { useCheckAuth } from "./hooks/useCheckAuth";

import UserRouter from "./router/UserRouter";
import AdminRouter from "./router/AdminRouter";
import Loader from "./components/Loader";

// The App component determines the routing based on user authentication and role (admin or user).
function App() {
    // On every page refresh, check if the user is logged in (and if they are an admin) to redirect to the correct router.
    const [user, isLoading] = useCheckAuth(); // Check if the user is authenticated and get the loading state.

    // By default, display a loading message while checking authentication.
    if (isLoading) {
        return <Loader />;
    }

    // When loading is complete, redirect to the correct router.
    // If the user is an admin, redirect to the admin router.
    // Otherwise, redirect to the user router (default).
    if (user.isAdmin) {
        return <AdminRouter />;
    } else return <UserRouter />;
}

export default App;

