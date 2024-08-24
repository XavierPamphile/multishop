import { useEffect, useState } from "react";
import { customFetch } from "../services/api";

// Custom hook to fetch categories from the API
function useFetchCategories() {
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        // Function to asynchronously fetch data from the API
        async function fetchData() {
            try {
                // Making a GET request to the "/category" endpoint using customFetch
                const response = await customFetch("/category", "GET");
                // Update the state with the fetched categories
                setCategories(response);
            } catch (error) {
                // Log any errors encountered during the fetch operation
                console.log("Fetch error:", error);
            }
        }
        // Call the fetchData function to initiate the fetch operation
        fetchData();
    }, []); // The empty dependency array means this effect runs once when the component mounts

    // Return the fetched categories
    return categories;
}

export default useFetchCategories;


