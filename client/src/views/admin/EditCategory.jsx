import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditCategory() {
    // State to store the category data.
    const [category, setCategory] = useState(null);
    // State to store any error messages.
    const [error, setError] = useState(null);
    // Extract the 'id' parameter from the URL.
    const { id } = useParams();
    // Hook to programmatically navigate to another route.
    const navigate = useNavigate();

    // Fetch the category details when the component mounts or when 'id' changes.
    useEffect(() => {
        async function fetchCategory() {
            // Send a request to fetch the category data by ID.
            const response = await fetch(`http://localhost:9000/api/v1/category/${id}`, {
                credentials: "include", // Include credentials (cookies, etc.) in the request.
            });
            // If the server responds with a 401 status, return without doing anything.
            if (response.status === 401) {
                return;
            }
            // If the response is OK, parse the JSON data and update the state.
            if (response.ok) {
                const data = await response.json();
                setCategory(data); // Update the state with the fetched category data.
            }
        }
        fetchCategory(); // Call the function to fetch the category data.
    }, [id]); // Re-run the effect if the 'id' changes.

    // Handle form submission to update the category.
    async function submitHandler(e) {
        e.preventDefault(); // Prevent the default form submission behavior.
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData); // Convert form data to a plain object.

        // Send a PATCH request to update the category.
        const response = await fetch(`http://localhost:9000/api/v1/category/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json", // Set the request content type to JSON.
            },
            body: JSON.stringify(data), // Send the updated category data as the request body.
            credentials: "include", // Include credentials (cookies, etc.) in the request.
        });

        // If the response is OK, navigate back to the category list.
        if (response.ok) {
            navigate("/category");
        } else {
            // If the response is not OK, parse the response data and set an error message.
            const responseData = await response.json();
            setError(responseData.message);
        }
    }

    // Display a loading message while the category data is being fetched.
    if (!category) {
        return (
            <main>
                <h2>Loading...</h2>
            </main>
        );
    }

    return (
        <main>
            <h2>Modifier la catégorie</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={submitHandler}>
                <label htmlFor="label">Label</label>
                <input type="text" id="label" name="label" defaultValue={category.label} required />
                <button type="submit">Modifier</button>
            </form>
        </main>
    );
}

export default EditCategory;

