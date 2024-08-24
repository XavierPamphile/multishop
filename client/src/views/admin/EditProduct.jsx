import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
    // State to store the product details.
    const [product, setProduct] = useState(null);
    // State to store the list of categories.
    const [categories, setCategories] = useState(null);
    // State to manage the loading state.
    const [isLoading, setIsLoading] = useState(true);
    // State to store any error messages.
    const [error, setError] = useState(null);
    // Hook to programmatically navigate to another route.
    const navigate = useNavigate();
    // Extract the 'id' parameter from the URL.
    const { id } = useParams();

    // Fetch the product details when the component mounts or when 'id' changes.
    useEffect(() => {
        async function fetchProduct() {
            const response = await fetch(`http://localhost:9000/api/v1/product/${id}`, {
                credentials: "include", // Include credentials (cookies, etc.) in the request.
            });
            if (response.ok) {
                const data = await response.json(); // Parse the JSON response.
                setProduct(data); // Update the state with the fetched product data.
            } else {
                setError("Error fetching product details.");
            }
        }
        fetchProduct(); // Call the function to fetch the product data.
    }, [id]); // Re-run the effect if the 'id' changes.

    // Fetch the list of categories when the component mounts.
    useEffect(() => {
        async function fetchCategories() {
            const response = await fetch("http://localhost:9000/api/v1/category", {
                credentials: "include",
            });
            if (response.ok) {
                const data = await response.json();
                setCategories(data); // Update the state with the fetched categories.
            } else {
                setError("Error fetching categories.");
            }
        }
        fetchCategories(); // Call the function to fetch the categories.
    }, []);

    // Set loading state to false when both product and categories are loaded.
    useEffect(() => {
        if (product && categories) {
            setIsLoading(false);
        }
    }, [product, categories]);

    // Handle form submission to update the product details.
    async function submitHandler(e) {
        e.preventDefault(); // Prevent the default form submission behavior.
        const form = e.target;
        const formData = new FormData(form); // Collect form data.

        const response = await fetch(`http://localhost:9000/api/v1/product/${id}`, {
            method: "PATCH", // Use PATCH method to update the product.
            body: formData, // Send form data as the request body.
            credentials: "include",
        });

        if (response.ok) {
            form.reset(); // Reset the form after a successful update.
            navigate("/product"); // Navigate back to the product list.
        } else {
            console.log("Error updating product", await response.json());
        }
    }

    // Display a loading message if the product and categories data is still loading.
    if (isLoading) {
        return (
            <main>
                <h2>Loading...</h2>
            </main>
        );
    }

    return (
        <main>
            <h2>Modifier produit</h2>
            <form 
                onSubmit={submitHandler} 
                style={{ display: "flex", flexDirection: "column" }}
                encType="multipart/form-data"
            >
                <label htmlFor="title">Main Title</label>
                <input type="text" id="title" name="title" defaultValue={product.title} required />

                <label htmlFor="sub_title">Sub Title</label>
                <input type="text" id="sub_title" name="sub_title" defaultValue={product.sub_title} required />

                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" defaultValue={product.description} required></textarea>

                <label htmlFor="price">Price</label>
                <input type="number" id="price" name="price" defaultValue={product.price} required />

                <label htmlFor="stock">Stock</label>
                <input type="number" id="stock" name="stock" defaultValue={product.stock} required />

                <label htmlFor="category_id">Category</label>
                <select name="category_id" id="category_id" defaultValue={product.category_id} required>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.label}
                        </option>
                    ))}
                </select>

                <label htmlFor="picture">Image</label>
                <input type="file" name="picture" id="picture" />

                <label htmlFor="alt">Alternative Text</label>
                <input type="text" id="alt" name="alt" defaultValue={product.alt} required />

                {error && <p style={{color: "red"}}>{error}</p>}

                <button type="submit">Modifier</button>
            </form>
        </main>
    );
}

export default EditProduct;

