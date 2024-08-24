import { useEffect, useState } from "react";
import { customFetch } from "../services/api";

function useFetchProduct() {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        // Asynchronous function to fetch products from our API server
        async function fetchData() {
            // Using try/catch to handle errors
            try {
                // Store the JSON response in a constant
                const response = await customFetch("/product", "GET");
                
                // Update the component's state with the received data, triggering a new render
                setProducts(response);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return [products];
}

export default useFetchProduct;
