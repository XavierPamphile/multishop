import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function DetailCategory() {
    // State to store the details of the category.
    const [category, setCategory] = useState(null);
    // Extracting the 'id' parameter from the URL.
    const { id } = useParams();

    useEffect(() => {
        // Function to fetch category details based on the category ID.
        async function fetchCategory() {
            const response = await fetch(`http://localhost:9000/api/v1/category/${id}`, {
                credentials: "include", // Include credentials (cookies, etc.) in the request.
            });
            if (response.status === 401) {
                return; // Stop execution if unauthorized.
            }
            if (response.ok) {
                const data = await response.json(); // Parse the JSON response.
                setCategory(data); // Update the state with the fetched category data.
            }
        }
        fetchCategory(); // Call the function to fetch category details.
    }, [id]); // Re-run the effect if the 'id' changes.

    // Display a loading message if the category data is not yet loaded.
    if (!category) {
        return (
            <main>
                <h1>Loading...</h1>
            </main>
        );
    }

    return (
        <main>
            <h1>Détails de la catégorie</h1>
            <Link to="/category">Retour</Link>
            <article>
                <h2>{category.label}</h2>
            </article>
        </main>
    );
}

export default DetailCategory;

