import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// User component fetches and displays the list of users.
function User() {
    const [users, setUsers] = useState(null); // State to store the list of users.
    const [refreshUserList, setRefreshUserList] = useState(false); // State to trigger a refresh of the user list.

    // Fetch the list of users when the component mounts or when the user list is refreshed.
    useEffect(() => {
        document.title = "Back Office | Utilisateurs";
        async function fetchUsers() {
            const response = await fetch(
                "http://localhost:9000/api/v1/auth/users", 
                {
                    credentials: "include",
                }
            );
            if (response.status === 401) {
                return; // If the user is unauthorized, do nothing.
            }
            if (response.ok) {
                const data = await response.json();
                setUsers(data); // Update the state with the fetched users.
            }
        }
        fetchUsers();
    }, [refreshUserList]); // Dependency array includes refreshUserList to trigger refetching.

    // Function to handle user deletion.
    async function deleteHandler(e, id) {
        e.preventDefault();
        const response = await fetch(
            `http://localhost:9000/api/v1/auth/${id}`,
            {
                method: "DELETE",
                credentials: "include",
            }
        );
        if (response.ok) {
            setRefreshUserList(!refreshUserList); // Toggle refreshUserList to refetch users.
        }
    }

    // Show a loading message while the users are being fetched.
    if (!users) {
        return (
            <main>
                <h2>Loading...</h2>
            </main>
        );
    }

    return (
        <main>
            <section>
                <h2>Liste des Utilisateurs</h2>
                <Link to="/user/add">
                    Ajouter un utilisateur <FontAwesomeIcon icon={faPlus} />
                </Link>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.lastname}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link to={`detail/${user.id}`}>
                                        Détails
                                    </Link>
                                    <Link to={`edit/${user.id}`}>
                                        /Modifier
                                    </Link>
                                    <button onClick={(e) => deleteHandler(e, user.id)}>
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

export default User;

