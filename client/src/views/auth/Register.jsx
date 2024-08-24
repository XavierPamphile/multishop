import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

// Register component to handle user registration.
function Register() {
    const { setUser } = useUser(); // Access the setUser function from the user context.
    const [error, setError] = useState(null); // State to store error messages.
    const navigate = useNavigate(); // Hook for programmatic navigation.

    // Function to handle form submission.
    async function submitHandler(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData); // Convert form data to an object.
        const response = await fetch(
            "http://localhost:9000/api/v1/auth/register",
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
        form.reset();
        if (response.status === 401 || response.status === 500) {
            setError(responseParsed.message);
            return;
        }
        if (response.status === 409) {
            setError("Cet email est déjà utilisé");
            return;
        }

        setUser(responseParsed.user); // Set the registered user in the context.
        navigate("/"); // Navigate to the homepage.
    }

    return (
        <main id="auth">
            {error && <p className="error">{error}</p>}
            <form onSubmit={submitHandler}>
                <input type="text" id="name" name="name" placeholder="Votre prénom" required />
                <input type="text" id="lastname" name="lastname" placeholder="Votre nom" required />
                <input type="email" id="email" name="email" placeholder="Votre email" required />
                <input type="password" id="password" name="password" placeholder="Votre mot de passe" required />
                <p>Le mot de passe doit contenir au moins 8 caractères, une majuscule, un caractère spécial et un chiffre.</p>
                <button type="submit">Register</button>
            </form>
        </main>
    );
}

export default Register;

