import Query from "../models/Query.js";

class Category {
    /** 
     * Selects all categories.
     * @returns {Promise<Array>} - A promise that resolves to the result of the query or an error.
     */
    static async selectAll() {
        const query = `SELECT * FROM category ORDER BY id ASC`;
        return await Query.run(query);
    }
    /** 
     * Selects a category by ID.
     * @param {int} id - The ID of the category to select.
     * @returns {Promise<Object>} - A promise that resolves to the result of the query or an error.
     */
    static async selectById(id) {
        const query = `SELECT * FROM category WHERE id = ?`;
        const result = await Query.runWithParams(query, [id]);
        return result[0];
    }
    /** 
     * Creates a new category in the database.
     * @param {Object} data - The data of the new category.
     * @returns {Promise<int>} - A promise that resolves to the ID of the newly created category.
     */
    static async create(data) {
        const query = `INSERT INTO category (label) VALUES (?)`;
        const result = await Query.runWithParams(query, [data.label]);
        return result.insertId;
    }
    /** 
     * Updates an existing category in the database.
     * @param {int} id - The ID of the category to update.
     * @param {Object} data - The data to update in the category.
     * @returns {Promise<void>} - A promise that resolves when the update is complete.
     */
    static async update(id, data) {
        const query = `UPDATE category SET label = ? WHERE id = ?`;
        await Query.runWithParams(query, [data.label, id]);
    }
    /** 
     * Deletes a category from the database.
     * @param {int} id - The ID of the category to delete.
     * @returns {Promise<void>} - A promise that resolves when the deletion is complete.
     */
    static async delete(id) {
        const query = `DELETE FROM category WHERE id = ?`;
        await Query.runWithParams(query, [id]);
    }
}

export default Category;
