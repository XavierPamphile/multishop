import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// import noPicture from "../../assets/images/no-picture.jpg"; // Uncomment and use if you have a default image for missing pictures.

function Detail() {
    // State to store the product details.
    const [product, setProduct] = useState(null); 
    // Extract the 'id' parameter from the URL.
    const { id } = useParams();

    // Fetch the product details when the component mounts or when the 'id' changes.
    useEffect(()=> {
        async function fetchProduct() {
            const response = await fetch("http://localhost:9000/api/v1/product/" + id, {
                credentials: "include", // Include credentials (cookies, etc.) in the request.
            });
            if (response.status === 401) {
                console.log("Unauthorized"); // Log if the user is not authorized to view the product.
                return;
            }
            if (response.ok) {
                const data = await response.json(); // Parse the JSON response.
                setProduct(data); // Update the state with the fetched product data.
            }
        }
        fetchProduct(); // Call the function to fetch the product details.
    }, [id]); // Re-run the effect if the 'id' changes.

    // Display a loading message if the product data is not yet loaded.
    if(!product) {
        return (
            <main>
                <h1>Loading...</h1>
            </main>
        );
    }

    return (
        <main>
            <h1>Details du produit</h1>
            <Link to="/product">Retour</Link>
            <article>
                <h2>{product.title}</h2>
                <h3>{product.sub_title}</h3>
                <p>{product.description}</p>
                <p>Price: {product.price} €</p>
                <p>In Stock: {product.stock}</p>
                <p>Category: {product.category}</p>
                <img src={"http://localhost:9000/images/" + product.picture} alt={product.alt} /> 
            </article>
        </main>
    );
}

export default Detail;
