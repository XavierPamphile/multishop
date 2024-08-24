// Middleware to validate password security.
// Regex: Checks that the password meets security criteria: at least 8 characters, one uppercase letter, one special character, and one number.

export default (req, res, next) => {
    const { password } = req.body;

    // Vérification de la sécurité du mot de passe
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/;

    if (!password || !passwordRegex.test(password)) {
        return res.status(403).json({ message: "Password does not meet the security requirements" });
    }
    next();
};

