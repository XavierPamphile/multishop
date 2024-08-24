import {Router} from "express";

// Import middlewares and controller functions.
import { getAll, getById, getByIdWithDetails, add, update, remove } from "../controllers/order.controllers.js";
import adminRequired from "../middlewares/adminRequired.js";
import userRequired from "../middlewares/userRequired.js";

const router = Router()

// Base route: http://localhost:9000/api/v1/order/.
router.get("/", getAll);
router.get("/:id", userRequired, getById);
router.get("/:id/details", userRequired, getByIdWithDetails);  
router.post("/", userRequired, add); 
router.patch("/:id", adminRequired, update);
router.delete("/:id", adminRequired, remove);

export default router;

