import { Router } from "express";

// Import middlewares and controller functions.
import { getAll, getById, add, update, remove, getProductsByCategory } from "../controllers/category.controllers.js";
import adminRequired from "../middlewares/adminRequired.js";

const router = Router();

// Base route: http://localhost:9000/api/v1/category.
router.get("/", getAll);
router.get("/:id", getById);
router.post("/", adminRequired, add);
router.patch("/:id", adminRequired, update);
router.delete("/:id", adminRequired, remove);

router.get("/:id/products", getProductsByCategory); 

export default router;

