import pool from "../config/db.js";
import Order from "../models/Order.js";

// Function to retrieve all orders (without details) for all users.

const getAll = async (req, res) => {
    try {
        const orders = await Order.selectAll();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

// Retrieve an order by id.

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.selectById(id); 
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

// Retrieve an order by id with details.

const getByIdWithDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const { order, orderDetails } = await Order.selectByIdWithDetails(id); 
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json({ order, orderDetails });
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

// Place an order for a user.

const add = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const {total_quantity, total_price, products } = req.body;
        const user_id = req.session.user.id;

        if (!total_quantity || !total_price || !products) {
            throw new Error("Missing required fields");
        }

        const orderId = await Order.create({total_quantity, total_price, user_id });
        await Order.addOrderDetail(orderId, products);

        await connection.commit();
        res.json({ msg: "Order successfully placed" });

    } catch (err) {
        if (connection) await connection.rollback();
        res.status(500).json({ error: err.message });
    } finally {
        if (connection) connection.release();
    }
};

// Update the status of an order.

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        await Order.update(id, { status });
        res.json({ msg: "Order successfully updated" });

    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

// Delete an order.

const remove = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const { id } = req.params;

        await Order.deleteOrderDetails(id); // Delete order details.
        await Order.delete(id); // Delete the order.

        await connection.commit();
        res.json({ msg: "Order successfully deleted" });

    } catch (err) {
        if (connection) await connection.rollback();
        res.status(500).json({ msg: "Server error", error: err.message });
    } finally {
        if (connection) connection.release();
    }
};
export { getAll, getById, getByIdWithDetails, add, update, remove };