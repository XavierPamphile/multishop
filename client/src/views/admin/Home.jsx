import { Link } from "react-router-dom";

// Home component serves as the main dashboard with links to various sections of the Back Office.
function Home() {
	return (
		<main>
			<h1>BACK OFFICE</h1>
			<nav>
				<Link to="/user"><strong>Utilisateurs</strong></Link>
				<Link to="/product"><strong>Produits</strong></Link>
				<Link to="/category"><strong>Catégories</strong></Link>
				<Link to="/order"><strong>Commandes</strong></Link>
			</nav>
		</main>
	);
}

export default Home;
