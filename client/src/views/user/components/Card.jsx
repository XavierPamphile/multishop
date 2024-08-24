import PropTypes from "prop-types";
import { useCart } from "../../../hooks/useCart";
import noPicture from "../../../assets/images/no-picture.jpg";

// The Card component receives a product as a prop.
function Card({ product }) {
    const { addToCart } = useCart(); // Access the addToCart function from the cart context.

    return (
        <article className="card" key={product.id}>
            <h3>{product.title}</h3>
            <img
                src={
                    product.picture
                        ? `http://localhost:9000/${product.picture}`
                        : noPicture
                }
                alt={product.title}
            />
            <p>{product.description}</p>
            <p>{product.price} €</p>
            <button onClick={() => addToCart(product)}>
                Ajouter au panier
            </button>
        </article>
    );
}

// Define the type of the product prop.
Card.propTypes = {
    product: PropTypes.object.isRequired,
};

export default Card;
