import useMenu from "../../hooks/useMenu";
import Loader from "../../components/Loader";
import Card from "./components/Card";
import useFetchProduct from "../../hooks/useFetchProduct";

// The Home component fetches and displays a list of products.
function Home() {
    const [products] = useFetchProduct(); // Fetch products using the custom hook.
    useMenu(); // Initialize the menu state and functionality.

    // Display a loader while the data is being fetched.
    if (!products) return <Loader />;

    // Once the data is fetched, display the products.
    if (products) {
        return (
            <main id="home">
                <div className="banner"></div>
                <section>
                    {products.map((product) => (
                        <Card key={product.id} product={product} />
                    ))}
                </section>
            </main>
        );
    }
}

export default Home;
