import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditUser() {
    // State to store the user's information.
    const [user, setUser] = useState(null);
    // State to store any error messages.
    const [error, setError] = useState(null);
    // Extract the 'id' parameter from the URL.
    const { id } = useParams();
    // Hook to programmatically navigate to another route.
    const navigate = useNavigate();

    // Fetch the user data when the component mounts or when the 'id' changes.
    useEffect(() => {
        async function fetchUser() {
            const response = await fetch(`http://localhost:9000/api/v1/auth/${id}`, {
                credentials: "include", // Include credentials (cookies, etc.) in the request.
            });
            if (response.status === 401) {
                return; // If the user is unauthorized, stop the function.
            }
            if (response.ok) {
                const data = await response.json(); // Parse the JSON response.
                setUser(data); // Update the state with the fetched user data.
            }
        }
        fetchUser(); // Call the function to fetch the user data.
    }, [id]); // Re-run the effect if the 'id' changes.

    // Handle the form submission to update the user's information.
    async function submitHandler(e) {
        e.preventDefault(); // Prevent the default form submission behavior.
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData); // Convert the form data to an object.

        const response = await fetch(`http://localhost:9000/api/v1/auth/${id}`, {
            method: "PATCH", // Use the PATCH method to update the user data.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // Send the updated data as JSON.
            credentials: "include",
        });

        if (response.ok) {
            navigate("/user"); // Navigate back to the user list if the update is successful.
        } else {
            const responseData = await response.json(); // Parse the error response.
            setError(responseData.message); // Set the error message in state.
        }
    }

    // Display a loading message if the user data is not yet loaded.
    if (!user) {
        return (
            <main>
                <h2>Loading...</h2>
            </main>
        );
    }

    return (
        <main>
            <h2>Modifier utilisateur</h2>
            {error && <p style={{color: "red"}}>{error}</p>}
            <form onSubmit={submitHandler}>
                <label htmlFor="name">First Name</label>
                <input type="text" id="name" name="name" defaultValue={user.name} required />
                <label htmlFor="lastname">Last Name</label>
                <input type="text" id="lastname" name="lastname" defaultValue={user.lastname} required />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" defaultValue={user.email} required />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
                <button type="submit">Modifier</button>
            </form>
        </main>
    );
}

export default EditUser;


