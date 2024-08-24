import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Category() {
    // State to store the list of categories.
    const [categories, setCategories] = useState(null);
    // State to trigger a refresh of the category list.
    const [refreshCategoryList, setCategoryList] = useState(false);

    useEffect(() => {
        // Set the document title for this page.
        document.title = "Back Office | Catégories";

        // Function to fetch the list of categories from the server.
        async function fetchCategories() {
            const response = await fetch(
                "http://localhost:9000/api/v1/category",
                {
                    credentials: "include", // Include credentials (cookies, etc.) in the request.
                }
            );
            if (response.status === 401) {
                return; // Stop execution if the user is unauthorized.
            }
            if (response.ok) {
                const data = await response.json(); // Parse the JSON response.
                setCategories(data); // Update the state with the fetched categories.
            }
        }
        fetchCategories(); // Call the function to fetch categories.
    }, [refreshCategoryList]); // Re-run the effect if refreshCategoryList changes.

    // Handler function to delete a category by its ID.
    async function deleteHandler(e, id) {
        e.preventDefault(); // Prevent the default form submission behavior.
        const response = await fetch(
            `http://localhost:9000/api/v1/category/${id}`,
            {
                method: "DELETE",
                credentials: "include", // Include credentials in the request.
            }
        );
        if (response.ok) {
            setCategoryList(!refreshCategoryList); // Trigger a refresh of the category list.
        }
    }

    // Display a loading message if categories haven't been loaded yet.
    if (!categories) {
        return (
            <main>
                <h2>Loading...</h2>
            </main>
        );
    }

    return (
        <main>
            <section>
                <h2>Category List</h2>
                <Link to="/category/add">
                   Ajouter une catégorie <FontAwesomeIcon icon={faPlus} />
                </Link>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Label</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.label}</td>
                                <td>
                                    <Link to={`detail/${category.id}`}>
                                        Details
                                    </Link>
                                    <Link to={`edit/${category.id}`}>
                                        /Modifier
                                    </Link>
                                    <button
                                        onClick={(e) => deleteHandler(e, category.id)}
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
}

export default Category;
