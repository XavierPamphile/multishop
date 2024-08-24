import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function DetailUser() {
    // State to store the user's details.
    const [user, setUser] = useState(null); 
    // Extracting the 'id' parameter from the URL.
    const { id } = useParams();

    useEffect(() => {
        // Function to fetch user details based on the user ID.
        async function fetchUser() {
            const response = await fetch(`http://localhost:9000/api/v1/auth/${id}`, {
                credentials: "include", // Include credentials (cookies, etc.) in the request.
            });
            if (response.status === 401) {
                console.log("Unauthorized"); // Log if the user is not authorized.
                return; // Stop execution if unauthorized.
            }
            if (response.ok) {
                const data = await response.json(); // Parse the JSON response.
                setUser(data); // Update the state with the fetched user data.
            }
        }
        fetchUser(); // Call the function to fetch user details.
    }, [id]); // Re-run the effect if the 'id' changes.

    // Display a loading message if the user data is not yet loaded.
    if (!user) {
        return (
            <main>
                <h1>Loading...</h1>
            </main>
        );
    }

    return (
        <main>
            <h1>Details utilisateur</h1>
            <Link to="/user">Retour</Link>
            <article>
                <h2>{user.name} {user.lastname}</h2>
                <p>Email: {user.email}</p>
            </article>
        </main>
    );
}

export default DetailUser;

