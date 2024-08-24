import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { customFetch } from "../../services/api";
import Loader from "../../components/Loader";
import Card from "./components/Card";

// The CategoryProducts component fetches and displays products from a specific category.
function CategoryProducts() {
    const { id } = useParams(); // Get the category ID from the URL parameters.
    const [products, setProducts] = useState(null); // State to store the fetched products.

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await customFetch(`/category/${id}/products`, "GET"); // Fetch products for the specific category.
                setProducts(response);
            } catch (error) {
                console.log("Fetch error:", error);
            }
        }
        fetchProducts();
    }, [id]); // Re-fetch products when the category ID changes.

    if (!products) return <Loader />; // Show loader while fetching products.

    return (
        <main>
            <h2>Produits</h2>
            <div className="product-grid">
                {products.map((product) => (
                    <Card key={product.id} product={product} />
                ))}
            </div>
        </main>
    );
}

export default CategoryProducts;

