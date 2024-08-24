import { createContext, useState } from "react";
import PropTypes from "prop-types";

// Create a context for managing the cart state
const Context = createContext();

// CartProvider component to provide cart-related state and functions across the app
function CartProvider({ children }) {
    // State to track the items in the cart
    const [cart, setCart] = useState([]);

    // Function to add a product to the cart
    function addToCart(product) {
        // Check if the product is already in the cart
        const productInCart = cart.find((item) => item.id === product.id);
        if (productInCart) {
            // If the product is in the cart, increment its quantity
            setCart((prevCart) =>
                prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
            return; // Exit the function early if the product was already in the cart
        }
        // If the product is not in the cart, add it with a quantity of 1
        setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }

    // Function to clear all items from the cart
    function clearCart() {
        setCart([]); // Set the cart state to an empty array
    }

    return (
        // Provide the cart state, addToCart, and clearCart functions to any component that consumes this context
        <Context.Provider value={{ cart, addToCart, clearCart }}>
            {children} {/* Render the children components */}
        </Context.Provider>
    );
}

// PropTypes to ensure children prop is passed and is a valid React node
CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Export the context and provider for use in other parts of the app
export { Context, CartProvider };


