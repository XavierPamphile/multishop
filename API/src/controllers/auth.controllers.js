import bcrypt from "bcrypt";
import Auth from "../models/Auth.js";

// Function to check if the user is logged in by verifying the session.

const checkAuth = (req, res) => {
    if(req.session.user){
        console.log("Existing session")
        res.json({message: "User is logged in", user: req.session.user});
    } else {
        console.log("No existing session")
        res.status(401).json({message: "User is not logged in"});
    }
};

// Register a new user.

const register = async (req, res) => {
    const { name, lastname, email, password } = req.body;
    try {
        const existingUser = await Auth.selectByEmail(email);

        if (existingUser) {
            return res.status(409).json({ message: "This user already exist" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const response = await Auth.create({ name, lastname, email, password : hashedPassword });
        res.status(201).json({ response});

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Log in a user.

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Auth.selectByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Incorrect information" });
        }

        req.session.user = user;
        delete req.session.user.password; // Remove the password property from the session
        res.status(200).json({ message: "Login successful", user });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Log out a user.

const logout = async (req, res) => {   
    req.session.destroy((err) => {
        if(err){
            return res.status(500).json({message: "Server error"});
        }
        res.clearCookie("session_id");
        res.status(200).json({message: "Logout successful"});
    });
};

// Get all users.
const getAll = async (req, res) => {
    try {
        const users = await Auth.selectAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Get a user by ID.
const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Auth.selectById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Update user information.

const update = async (req, res) => {

    const { id } = req.params;
    const { name, lastname, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await Auth.update(id, { name, lastname, email, password: hashedPassword });
        res.json({ message: "User successfully updated" });
        
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Delete a user.

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await Auth.delete(id);
        res.json({ message: "User successfully deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export { checkAuth, login, register, logout, getAll, getById, update, remove };
