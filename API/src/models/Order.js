import Query from "../models/Query.js";

class Order {
    /** 
     * Selects all orders with user information.
     * @returns {Promise<Array>} - A promise that resolves the result of the query or an error.
     */
    static async selectAll() {
        const query = `SELECT \`order\`.*, user.name, user.lastname, user.email 
                       FROM \`order\`
                       JOIN user ON \`order\`.user_id = user.id`;
        return await Query.run(query);
    }

    /** 
     * Selects an order by ID.
     * @param {int} id - The ID of the order to select.
     * @returns {Promise<Object>} - A promise that resolves to the result of the query or an error.
     */
    static async selectById(id) {
        const query = `SELECT \`order\`.*, user.name, user.lastname, user.email 
                       FROM \`order\`
                       JOIN user ON \`order\`.user_id = user.id
                       WHERE \`order\`.id = ?`;
        const result = await Query.runWithParams(query, [id]);
        return result[0];
    }

    /** 
     * Selects an order by ID with details.
     * @param {int} id - The ID of the order to select.
     * @returns {Promise<Object>} - A promise that resolves to the result of the query or an error.
     */
    static async selectByIdWithDetails(id) {
    const queryOrder = `SELECT \`order\`.*, user.name, user.lastname, user.email 
                        FROM \`order\`
                        JOIN user ON \`order\`.user_id = user.id
                        WHERE \`order\`.id = ?`;
    const queryOrderDetails = `SELECT order_detail.*, product.title
                               FROM order_detail
                               JOIN product ON order_detail.product_id = product.id
                               WHERE order_detail.order_id = ?`;

    const [order, orderDetails] = await Promise.all([
        Query.runWithParams(queryOrder, [id]),
        Query.runWithParams(queryOrderDetails, [id])
    ]);

    return { order: order[0], orderDetails };
    }
    
    /** 
     * Creates a new order in the database.
     * @param {Object} data - The data of the order.
     * @returns {Promise<int>} - A promise that resolves to the ID of the newly created order.
     */
    static async create(data) {
        const query = `INSERT INTO \`order\` (total_quantity, total_price, user_id) VALUES (?, ?, ?, ?)`;
        const result = await Query.runWithParams(query, [data.total_quantity, data.total_price, data.user_id]);
        return result.insertId;
    }

    /** 
     * Updates the status of an existing order in the database.
     * @param {int} id - The ID of the order to update.
     * @param {Object} data - The data to update in the order.
     * @returns {Promise<void>} - A promise that resolves when the update is complete.
     */
    static async update(id, data) {
        const query = `UPDATE \`order\` SET status = ? WHERE id = ?`;
        await Query.runWithParams(query, [data.status, id]);
    }

    /** 
     * Deletes an order from the database.
     * @param {int} id - The ID of the order to delete.
     * @returns {Promise<void>} - A promise that resolves when the deletion is complete.
     */
    static async delete(id) {
        const query = `DELETE FROM \`order\` WHERE id = ?`;
        await Query.runWithParams(query, [id]);
    }

    /** 
     * Adds order details to a specific order.
     * @param {int} orderId - The ID of the order
     * @param {Object} products - List of products to add
     * @returns {Promise<void>} - A promise that resolves to the result of the query or an error.
     */
    static async addOrderDetail(orderId, products) {
        const queries = products.map(product => {
            const { product_id, quantity, unit_price } = product;
            return Query.runWithParams(
                `INSERT INTO order_detail (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)`,
                [orderId, product_id, quantity, unit_price]
            );
        });
        await Promise.all(queries);
    }

    /** 
     * Deletes the details of a specific order.
     * @param {int} orderId - The ID of the order
     * @returns {Promise<void>} - A promise that resolves when the removal is complete.
     */
    static async deleteOrderDetails(orderId) {
        const query = `DELETE FROM order_detail WHERE order_id = ?`;
        await Query.runWithParams(query, [orderId]);
    }
}

export default Order;
