import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddUser() {
    // State to track any error messages.
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Handler for form submission
    async function submitHandler(e) {
        e.preventDefault(); // Prevent the default form submission behavior.
        const form = e.target; // Get the form element.
        const formData = new FormData(form); // Create a FormData object from the form.
        const data = Object.fromEntries(formData); // Convert the FormData to a regular object.
        
        // Send a POST request to the server to register a new user.
        const response = await fetch("http://localhost:9000/api/v1/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // Convert the data to JSON format.
            credentials: "include", // Include credentials (cookies, etc.) in the request.
        });

        // If the response is successful, reset the form and navigate to the user list page.
        if (response.ok) {
            form.reset();
            navigate("/user");
        } else {
            // If there is an error, parse the error message and display it.
            const responseData = await response.json();
            setError(responseData.message);
        }
    }

    return (
        <main>
            <h2>Ajouter un utilisateur</h2>
            {error && <p style={{color: "red"}}>{error}</p>}
            <form onSubmit={submitHandler}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
                <label htmlFor="lastname">Last Name</label>
                <input type="text" id="lastname" name="lastname" required />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
                <button type="submit">Ajouter</button>
            </form>
        </main>
    );
}

export default AddUser;


