import { useCart } from "../../hooks/useCart";

// The Cart component displays the items in the user's cart and provides a button to clear the cart.
function Cart() {
    const { cart, clearCart } = useCart(); // Access the cart and clearCart function from the cart context.

    return (
        <section>
            <h2>Mon panier</h2>
            {!cart.length ? (
                <p>Panier vide😒</p>
            ) : (
                cart.map((item) => (
                    <article key={item.id}>
                        <p>titre : {item.title}</p>
                        <p>prix unitaire : {item.price} €</p>
                        <p>quantité : {item.quantity}</p>
                        <br></br>
                    </article>
                ))
            )}
            {cart.length > 0 && (
                <div>
                    <button onClick={clearCart}>Vider le panier</button>
                </div>
            )}
        </section>
    );
}

export default Cart;



