import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

// Login component to handle user authentication.
function Login() {
    const { login } = useUser(); // Access the login function from the user context.
    const [error, setError] = useState(null); // State to store error messages.
    const [success, setSuccess] = useState(null); // State to store success messages.
    const navigate = useNavigate(); // Hook for programmatic navigation.

    // Function to handle form submission.
    async function submitHandler(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData); // Convert form data to an object.
        const response = await fetch(
            "http://localhost:9000/api/v1/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include",
            }
        );
        const responseParsed = await response.json();
        if (response.status === 401 || response.status === 500) {
            setError("Email ou mot de passe incorrect");
            setSuccess(null);
            return;
        }
        if (response.status === 200) {
            login(responseParsed.user); // Log in the user.
            setError(null);
            setSuccess("Connexion réussie");
            form.reset();
            // Redirect after a delay to show the success message.
            setTimeout(() => {
                navigate("/");
            }, 1500);
        }
    }

    return (
        <main id="auth">
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={submitHandler}>
                <input type="email" id="email" name="email" placeholder="Votre email" required />
                <input type="password" id="password" name="password" placeholder="Votre mot de passe" required />
                <button type="submit">Login</button>
            </form>
            <p>
                Vous n&apos;avez pas de compte ?{" "}
                <Link to="/register">Inscrivez-vous</Link>
            </p>
        </main>
    );
}

export default Login;

