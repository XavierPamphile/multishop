import { Router } from "express";

// Routes import.
import auth_router from "./auth.routes.js";
import product_router from "./product.routes.js";
import category_router from "./category.routes.js";
import order_router from "./order.routes.js";

const router = Router(); // Create a router instance.
const BASE_API = "/api/v1"; // Base URL for the API.

// Base route to check API connectivity.
// http://localhost:9000/
router.get("/", (req, res) => {
    res.json({ msg: "connected to the API!" });
});

// Depending on the endpoint, redirect to the corresponding router.
// Example: http://localhost:9000/api/v1/product -> redirects to the "product" router.
router.use(`${BASE_API}/auth`, auth_router);
router.use(`${BASE_API}/product`, product_router);
router.use(`${BASE_API}/category`, category_router);
router.use(`${BASE_API}/order`, order_router);

export default router;


