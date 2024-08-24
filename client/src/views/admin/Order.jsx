import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Order component fetches and displays the list of orders.
function Order() {
    const [orders, setOrders] = useState(null); // State to store the list of orders.
    const [refreshOrderList, setRefreshOrderList] = useState(false); // State to trigger a refresh of the order list.

    // Fetch the list of orders when the component mounts or when the order list is refreshed.
    useEffect(() => {
        document.title = "Back Office | Commandes";
        async function fetchOrders() {
            const response = await fetch("http://localhost:9000/api/v1/order", {
                credentials: "include",
            });
            if (response.status === 401) {
                return; // If the user is unauthorized, do nothing.
            }
            if (response.ok) {
                const data = await response.json();
                setOrders(data); // Update the state with the fetched orders.
            }
        }
        fetchOrders();
    }, [refreshOrderList]); // Dependency array includes refreshOrderList to trigger refetching.

    // Function to handle order deletion.
    async function deleteHandler(e, id) {
        e.preventDefault();
        const response = await fetch(`http://localhost:9000/api/v1/order/${id}`, {
            method: "DELETE",
            credentials: "include",
        });
        if (response.ok) {
            setRefreshOrderList(!refreshOrderList); // Toggle refreshOrderList to refetch orders.
        }
    }

    // Show a loading message while the orders are being fetched.
    if (!orders) {
        return (
            <main>
                <h2>Loading...</h2>
            </main>
        );
    }

    return (
        <main>
            <section>
                <h2>Liste des Commandes</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Date de commande</th>
                            <th>Statut</th>
                            <th>Nombre de produits</th>
                            <th>Prix total</th>
                            <th>Utilisateur</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.ordered_date}</td>
                                <td>{order.status}</td>
                                <td>{order.total_quantity}</td>
                                <td>{order.total_price} €</td>
                                <td>{order.name} {order.lastname} ({order.email})</td>
                                <td>
                                    <Link to={`detail/${order.id}`}>Détails</Link>
                                    <Link to={`edit/${order.id}`}>Modifier</Link>
                                    <button onClick={(e) => deleteHandler(e, order.id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
}

export default Order;
