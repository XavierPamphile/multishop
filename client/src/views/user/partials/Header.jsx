import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useUser } from "../../../hooks/useUser";
import useMenu from "../../../hooks/useMenu";
import useFetchCategories from "../../../hooks/useFetchCategories"; // Import the hook for fetching categories.
import logo from "../../../assets/images/logo.png";
import { useCart } from "../../../hooks/useCart";

// The Header component displays the site's navigation bar and handles the menu and cart.
function Header() {
    const { user, logout } = useUser(); // Access user information and logout function from the user context.
    const { isMenuOpen, toggleMenu } = useMenu(); // Access menu state and toggle function from the menu context.
    const { cart } = useCart(); // Access the cart from the cart context.
    const categories = useFetchCategories(); // Fetch categories using the custom hook.

    return (
        <header>
            {isMenuOpen && <div className="overlayOn" onClick={toggleMenu} />}
            <div>
                <button onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <h1>
                    <Link to={"/"}>
                        <img src={logo} alt="Roshop Logo" />
                    </Link>
                </h1>
            </div>

            {isMenuOpen && (
                <nav className="burger-menu">
                    <button onClick={toggleMenu}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <Link to={"/"}>Page d&apos;accueil Roshop</Link>
                    <hr />
                    {categories.map((category) => (
                        <Link key={category.id} to={`/category/${category.id}`}>
                            {category.label}
                        </Link>
                    ))}

                    {user.isLogged && (
                        <>
                            <NavLink to={"/dashboard"} className={"bar-nav"}>
                                Compte
                            </NavLink>
                            <button onClick={logout} className={"bar-nav"}>
                                Déconnexion
                            </button>
                        </>
                    )}
                </nav>
            )}
            <nav>
                {!user.isLogged && (
                    <NavLink to={"login"} className={"bar-nav"}>
                        Connexion
                    </NavLink>
                )}
                {user.isLogged && (
                    <>
                        <NavLink to={"/dashboard"} className={"bar-nav"}>
                            {user.nickname} <FontAwesomeIcon icon={faUser} />
                        </NavLink>
                    </>
                )}
                <NavLink to={"cart"} className="cart">
                    <span className="cart-length">{cart.length ? cart.length : null}</span>
                    <FontAwesomeIcon icon={faCartShopping} />
                </NavLink>
            </nav>
        </header>
    );
}

export default Header;

