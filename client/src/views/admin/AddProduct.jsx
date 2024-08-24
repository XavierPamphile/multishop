import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
    // State to store the list of categories.
    const [categories, setCategories] = useState(null);
    // State to track if data is still loading.
    const [isLoading, setIsLoading] = useState(true);
    // State to store any error messages.
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch categories when the component mounts.
    useEffect(() => {
        async function fetchCategories() {
            const response = await fetch(
                "http://localhost:9000/api/v1/category",
                {
                    credentials: "include",
                }
            );
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
            } else {
                setError("Error fetching categories");
            }
        }
        fetchCategories();
    }, []);

    // Stop loading when categories are fetched.
    useEffect(() => {
        if (categories) {
            setIsLoading(false);
        }
    }, [categories]);

    // Handle form submission.
    async function submitHandler(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        // Send a POST request to add a new product.
        const response = await fetch(
            "http://localhost:9000/api/v1/product",
            {
                method: "POST",
                body: formData,
                credentials: "include",
            }
        );

        // Handle different response statuses.
        if (response.status === 400) {
            response.json().then(data => { 
                setError(data.message);
            });
        }

        if (response.ok) {
            form.reset();
            navigate("/product");
        } else {
            console.log("Error adding product", await response.json());
        }
    }

    // Show a loading state if data is still being fetched.
    if (isLoading) {
        return (
            <main>
                <h2>Loading...</h2>
            </main>
        );
    }

    // Render the form once data is loaded.
    return (
        <main>
            <h2>Ajouer un produit</h2>
            <form 
                onSubmit={submitHandler} 
                style={{ display: "flex", flexDirection: "column" }}
            >
                <label htmlFor="title">Main Title</label>
                <input type="text" id="title" name="title" required />

                <label htmlFor="sub_title">Subtitle</label>
                <input type="text" id="sub_title" name="sub_title" required />

                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" required></textarea>

                <label htmlFor="price">Price</label>
                <input type="number" id="price" name="price" required />

                <label htmlFor="stock">Stock</label>
                <input type="number" id="stock" name="stock" required />

                <label htmlFor="category_id">Category</label>
                <select name="category_id" id="category_id" required>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.label}
                        </option>
                    ))}
                </select>

                <label htmlFor="picture">Image</label>
                <input type="file" name="picture" id="picture" required />

                <label htmlFor="alt">Alt Text</label>
                <input type="text" id="alt" name="alt" required />

                {error && <p style={{color: "red"}}>{error}</p>}

                <button type="submit">Ajouter</button>
            </form>
        </main>
    );
}

export default AddProduct;
