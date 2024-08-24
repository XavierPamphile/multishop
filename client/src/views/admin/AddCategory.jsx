import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCategory() {
    // State to store any error messages.
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Function to handle form submission.
    async function submitHandler(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Send a POST request to create a new category.
        const response = await fetch("http://localhost:9000/api/v1/category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include", // Include credentials like cookies.
        });

        // If the request is successful, reset the form and navigate to the category list.
        if (response.ok) {
            form.reset();
            navigate("/category");
        } else {
            // If there is an error, update the error state with the message from the server.
            const responseData = await response.json();
            setError(responseData.message);
        }
    }

    return (
        <main>
            <h2>Ajouter une catégorie</h2>
            {error && <p style={{color: "red"}}>{error}</p>}
            <form onSubmit={submitHandler}>
                <label htmlFor="label">Label</label>
                <input type="text" id="label" name="label" required />
                <button type="submit">Ajouter</button>
            </form>
        </main>
    );
}

export default AddCategory;
