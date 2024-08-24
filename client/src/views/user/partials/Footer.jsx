import { Link } from "react-router-dom";

// The Footer component displays links to privacy policy and terms of use.
function Footer() {
    return (
        <footer>
            <p>&copy; 2024 - Xavier Pamphile / 3W Academy</p>
            <p>
                <Link to="/privacy-policy">Politique de confidentialité</Link> | {" "}
                <Link to="/terms-of-use">Conditions d&apos;utilisation</Link>
            </p>
        </footer>
    );
}

export default Footer;
