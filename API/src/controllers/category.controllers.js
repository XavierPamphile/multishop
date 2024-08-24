import Category from "../models/Category.js";
import Product from "../models/Product.js";

// Function to retrieve all categories.

const getAll = async (req, res) => {
    try {
        const categories = await Category.selectAll();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

// Retrieve a category by ID.

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.selectById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json(category);
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

// Add a new category.

const add = async (req, res) => {
    try {
        const { label } = req.body;
        const categoryId = await Category.create({ label });
        res.json({ msg: `Category '${label}' successfully added with ID ${categoryId}` });
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

// Update an existing category.

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { label } = req.body;
        await Category.update(id, { label });
        res.json({ msg: "Data successfully updated" });
    } catch (err) {
        res.status(500).json({ msg: "Erreur de serveur", error: err.message });
    }
};

// Delete a category.

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        await Category.delete(id);
        res.json({ msg: "Category successfully deleted" });
    } catch (err) {
        res.status(500).json({ msg: "Erreur de serveur", error: err.message });
    }
};

// Function to get products by category

const getProductsByCategory = async (req, res) => {
	try {
		const { id } = req.params;
		const products = await Product.selectByCategoryId(id);
		res.json(products);
	} catch (err) {
		res.status(500).json({ message: "Server error", error: err.message });
	}
};

export { getAll, getById, add, update, remove, getProductsByCategory };
