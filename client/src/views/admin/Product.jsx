import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noPicture from "../../assets/images/no-picture.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// Product component fetches and displays the list of products.
function Product() {
	const [products, setProducts] = useState(null); // State to store the list of products.
	const [refreshProductList, setProductList] = useState(false); // State to trigger a refresh of the product list.

	// Fetch the list of products when the component mounts or when the product list is refreshed.
	useEffect(() => {
		document.title = "Back Office | Produits";
		async function fetchProducts() {
			const response = await fetch(
				"http://localhost:9000/api/v1/product",
				{
					credentials: "include",
				}
			);
			if (response.status === 401) {
				return; // If the user is unauthorized, do nothing.
			}
			if (response.ok) {
				const data = await response.json();
				setProducts(data); // Update the state with the fetched products.
			}
		}
		fetchProducts();
	}, [refreshProductList]); // Dependency array includes refreshProductList to trigger refetching.

	// Function to handle product deletion.
	async function deleteHandler(e, id) {
		e.preventDefault();
		const response = await fetch(
			`http://localhost:9000/api/v1/product/${id}`,
			{
				method: "DELETE",
				credentials: "include",
			}
		);
		if (response.ok) {
			setProductList(!refreshProductList); // Toggle refreshProductList to refetch products.
		} 
	}

	// Show a loading message while the products are being fetched.
	if (!products) {
		return (
			<main>
				<h2>Loading...</h2>
			</main>
		);
	}

	return (
		<main>
			<section>
				<h2>Liste des Produits</h2>
				<Link to="/product/add">
					Ajouter un produit <FontAwesomeIcon icon={faPlus} />
				</Link>
				<table>
					<thead>
						<tr>
							<th>Id</th>
							<th>Image</th>
							<th>Nom</th>
							<th>Prix</th>
							<th>Stock</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => {
							return (
								<tr key={product.id}>
									<td>{product.id}</td>
									<td>
										<img
											src={
												product.picture
													? `http://localhost:9000/${product.picture}`
													: noPicture
											}
											alt={product.alt}
										/>
									</td>
									<td>{product.title}</td>
									<td>{product.price} €</td>
									<td>{product.stock}</td>
									<td>
										<Link to={"detail/" + product.id}>
											Détails 
										</Link>
										<Link to={"edit/" + product.id}>
											/Modifier
										</Link>
										<button
											onClick={(e) =>
												deleteHandler(e, product.id)
											}
										>
											Supprimer
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</section>
		</main>
	);
}

export default Product;
