import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditOrder() {
    // State to store the current status of the order.
    const [status, setStatus] = useState("");
    // State to store any error messages.
    const [error, setError] = useState(null);
    // Hook to programmatically navigate to another route.
    const navigate = useNavigate();
    // Extract the 'id' parameter from the URL.
    const { id } = useParams();

    // Fetch the order details when the component mounts or when 'id' changes.
    useEffect(() => {
        async function fetchOrder() {
            try {
                // Send a request to fetch the order data by ID.
                const response = await fetch(`http://localhost:9000/api/v1/order/${id}`, {
                    credentials: "include", // Include credentials (cookies, etc.) in the request.
                });
                if (response.ok) {
                    const data = await response.json(); // Parse the JSON response.
                    setStatus(data.status); // Update the state with the fetched order status.
                } else {
                    setError("Failed to fetch order"); // Set error message if the fetch fails.
                }
            } catch (error) {
                setError(error.message); // Set error message if an exception occurs.
            }
        }

        fetchOrder(); // Call the function to fetch the order data.
    }, [id]); // Re-run the effect if the 'id' changes.

    // Handle the change in the status input field.
    const handleInputChange = (e) => {
        setStatus(e.target.value); // Update the status state with the new value.
    };

    // Handle form submission to update the order status.
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior.
        try {
            const response = await fetch(`http://localhost:9000/api/v1/order/${id}`, {
                method: "PATCH", // Use PATCH method to update the order status.
                headers: {
                    "Content-Type": "application/json", // Set the request content type to JSON.
                },
                body: JSON.stringify({ status }), // Send the updated status as the request body.
                credentials: "include",
            });
            if (response.ok) {
                navigate("/order"); // Navigate back to the order list after a successful update.
            } else {
                const data = await response.json();
                setError(data.message); // Set error message if the response is not OK.
            }
        } catch (error) {
            setError(error.message); // Set error message if an exception occurs.
        }
    };

    // Display an error message if there is an error.
    if (error) {
        return (
            <main>
                <h2>Error</h2>
                <p>{error}</p>
            </main>
        );
    }

    // Display a loading message while the order status is being fetched.
    if (!status) {
        return (
            <main>
                <h2>Loading...</h2>
            </main>
        );
    }

    return (
        <main>
            <h2>Modifier commande</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="status">Status</label>
                <select
                    name="status"
                    id="status"
                    value={status} // Set the value of the select to the current status.
                    onChange={handleInputChange} // Handle changes in the select input.
                    required
                >
                    <option value="réceptionné">Received</option>
                    <option value="traitée">Processed</option>
                    <option value="expédiée">Shipped</option>
                    <option value="livrée">Delivered</option>
                    <option value="annulée">Canceled</option>
                </select>
                {error && <p style={{ color: "red" }}>{error}</p>} 
                <button type="submit">Modifier</button>
            </form>
        </main>
    );
}

export default EditOrder;
