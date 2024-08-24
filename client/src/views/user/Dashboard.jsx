import { useCheckAuth } from "../../hooks/useCheckAuth";
import useMenu from "../../hooks/useMenu";

// The Dashboard component displays user information if the user is logged in.
function Dashboard() {
    useMenu(); // Initialize the menu state and functionality.
    const [user] = useCheckAuth(); // Check if the user is authenticated and get user information.

    if (user.isLogged) {
        return (
            <main>
                <h1>Mon compte</h1>
                <section>
                    <h2>Mes informations</h2>
                    <p>Nom: {user.name}</p>
                    <p>Prénom: {user.lastname}</p>
                    <p>Email: {user.email}</p>
                </section>
            </main>
        );
    }
}

export default Dashboard;

