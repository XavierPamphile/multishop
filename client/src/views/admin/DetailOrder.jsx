import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DetailOrder() {
    // Extract the 'id' parameter from the URL.
    const { id } = useParams();
    // State to store the order details.
    const [order, setOrder] = useState(null);
    // State to store the detailed information of each product in the order.
    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        // Function to fetch order details from the API.
        async function fetchOrder() {
            try {
                const response = await fetch(`http://localhost:9000/api/v1/order/${id}/details`, {
                    credentials: "include", // Include credentials (cookies, etc.) in the request.
                });
                if (response.ok) {
                    const data = await response.json(); // Parse the JSON response.
                    // Update the state with the order and its details.
                    setOrder(data.order);
                    setOrderDetails(data.orderDetails);
                } else {
                    console.error("Failed to fetch order details"); // Log an error if the request fails.
                }
            } catch (error) {
                console.error("Error:", error); // Log any errors encountered during the fetch.
            }
        }
        fetchOrder(); // Call the function to fetch order details.
    }, [id]); // Re-run the effect if the 'id' changes.

    // Display a loading message if the order data is not yet loaded.
    if (!order) {
        return <main><h2>Loading...</h2></main>;
    }

    return (
        <main>
            <section>
                <h2>Détails de la commande</h2>
                <p>ID: {order.id}</p>
                <p>User: {order.name} {order.lastname}</p>
                <p>Order Date: {new Date(order.ordered_date).toLocaleDateString()}</p>
                <p>Status: {order.status}</p>
                <p>Total Quantity: {order.total_quantity}</p>
                <p>Total Price: {order.total_price} €</p>

                <h3>Détails des produits</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetails.map((detail) => (
                            <tr key={detail.id}>
                                <td>{detail.title}</td>
                                <td>{detail.quantity}</td>
                                <td>{detail.unit_price} €</td>
                                <td>{(detail.unit_price * detail.quantity).toFixed(2)} €</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
}

export default DetailOrder;

