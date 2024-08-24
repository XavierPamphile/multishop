import Query from "../models/Query.js";

class Product {
    /** 
     * Selects all products with their categories.
     * @returns {Promise<Array>} - A promise that resolves to the result of the query or an error.
     */
    static async selectAll() {
        const query = `SELECT product.id, title, sub_title, description, price, stock, category.label AS category
            FROM product 
            JOIN category ON product.category_id = category.id
            ORDER BY product.id ASC`;
        return await Query.run(query);
    }
    /** 
     * Selects a product by ID with its category.
     * @param {int} id - The ID of the product to select.
     * @returns {Promise<Object>} - A promise that resolves to the result of the query or an error.
     */
    static async selectById(id) {
        const query = `SELECT product.id, title, sub_title, description, price, stock, category.label AS category
                FROM product 
                JOIN category ON product.category_id = category.id
                WHERE product.id = ?`;
        const result = await Query.runWithParams(query, [id]);
        return result[0];
    }
    /** 
     * Creates a new product in the database.
     * @param {Object} data - The data of the new product.
     * @returns {Promise<int>} - A promise that resolves to the ID of the newly created product.
     */
    static async create(data) {
        const query = `INSERT INTO product (title, sub_title, description, price, stock, picture, alt, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const result = await Query.runWithParams(query, [data.title, data.sub_title, data.description, data.price, data.stock, data.picture, data.alt, data.category_id]);
        return result.insertId;
    }
    /** 
     * Updates an existing product in the database.
     * @param {int} id - The ID of the product to update.
     * @param {Object} data - The data to update in the product.
     * @returns {Promise<void>} - A promise that resolves when the update is complete.
     */
    static async update(id, data) {
        const query = `UPDATE product SET title = ?, sub_title = ?, description = ?, price = ?, stock = ?, picture = ?, alt = ?, category_id = ? WHERE id = ?`;
        await Query.runWithParams(query, [data.title, data.sub_title, data.description, data.price, data.stock, data.picture, data.alt, data.category_id, id]);
    }
    /** 
     * Deletes a product from the database.
     * @param {int} id - The ID of the product to delete.
     * @returns {Promise<void>} - A promise that resolves when the deletion is complete.
     */
    static async delete(id) {
        const query = `DELETE FROM product WHERE id = ?`;
        await Query.runWithParams(query, [id]);
    }
    /** 
     * Retrieves products by their associated category ID.
     * @param {int} categoryId - The ID of the category to filter products by.
     * @returns {Promise<Array>} - A promise that resolves with the list of products in the specified category, or an error.
     */
    static async selectByCategoryId(categoryId) {
		const query = "SELECT * FROM product WHERE category_id = ?";
		const result = await Query.runWithParams(query, [categoryId]);
		return result;
	}
}

export default Product;