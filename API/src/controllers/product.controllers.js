import upload from "../config/multer.js";
import Product from "../models/Product.js";

// Function to retrieve all products.

const getAll = async (req, res) => {
    try {
        const products = await Product.selectAll();
        res.json(products);
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

// Retrieve a product by ID.

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.selectById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

// Add a new product.

const add = async (req, res) => {
    try {
        upload(req, res, async function (error) {
            if (error) {
                return res.status(400).json({ message: error.message });
            }

            if (!req.file) {
                return res.status(400).json({
                    message: "Please select an image in webp format",
                });
            }

            const product = {
                title: req.body.title,
                sub_title: req.body.sub_title,
                description: req.body.description,
                price: req.body.price,
                stock: req.body.stock,
                picture: req.file.filename,
                alt: req.body.alt,
                category_id: req.body.category_id,
            };

            try {
                const productId = await Product.create(product);
                res.json({
                    msg: "Data successfully inserted",
                    productId,
                });
            } catch (err) {
                res.status(500).json({
                    msg: "Server error",
                    error: err.message,
                });
            }
        });
    } catch (error) {
        console.log("ERROR", error);
        res.status(500).json({
            msg: "Server error",
            error: error.message,
        });
    }
};

// Update an existing product.

const update = async (req, res) => {
    try {
        const { id } = req.params;
        upload(req, res, async function (error) {
            if (error) {
                return res.status(400).json({ message: error });
            }

            const productData = {
                title: req.body.title,
                sub_title: req.body.sub_title,
                description: req.body.description,
                price: req.body.price,
                stock: req.body.stock,
                category_id: req.body.category_id,
                alt: req.body.alt,
            };

            if (req.file) {
                productData.picture = req.file.filename;
            }

            await Product.update(id, productData);
            res.json({ msg: "Data successfully updated" });
        });
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

// Delete a product.

const remove= async (req, res) => {
    try {
        const { id } = req.params;
        await Product.delete(id);
        res.json({ msg: "Product successfully deleted" });
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

export { getAll, getById, add, update, remove };
