import { Router } from "express";

// Import middlewares and controller functions.
import { checkAuth, register, login, logout, getAll, getById, update, remove } from "../controllers/auth.controllers.js";
import adminRequired from "../middlewares/adminRequired.js";
import userRequired from "../middlewares/userRequired.js";
import safePassRequired from "../middlewares/safePassRequired.js";

const router = Router();

// Base route: http://localhost:9000/api/v1/auth.
router.get("/", checkAuth);
router.post("/register", safePassRequired, register);
router.post("/login", login);
router.get("/logout", userRequired, logout);
router.get("/users", adminRequired, getAll);
router.get("/:id", adminRequired, getById);
router.patch('/:id', safePassRequired, update); 
router.delete('/:id', adminRequired, remove); 

export default router;

