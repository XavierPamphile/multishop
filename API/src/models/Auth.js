import Query from "../models/Query.js";

class Auth {
    /** 
     * Selects a user by their email.
     * @param {string} email - The email of the user to select.
     * @returns {Promise<Object>} - A promise that resolves the result of the query or an error.
     */
    static async selectByEmail(email) {
        const query = `SELECT * FROM user WHERE email = ?`;
        const result = await Query.runWithParams(query, [email]);
        return result[0];
    }
    /** 
     * Selects all users.
     * @returns {Promise<Array>} - A promise that resolves the result of the query or an error.
     */
        static async selectAll() {
            const query = `SELECT * FROM user ORDER BY id ASC`;
            return await Query.run(query);
        }
      /** 
     * Selects a user by their ID.
     * @param {int} id - The ID of the user to select.
     * @returns {Promise<Object>} - A promise that resolves the result of the query or an error.
     */
      static async selectById(id) {
        const query = `SELECT * FROM user WHERE id = ?`;
        const result = await Query.runWithParams(query, [id]);
        return result[0];
    }
    /** 
     * Creates a new user in the database.
     * @param {Object} data - The data of the new user.
     * @returns {Promise<int>} - A promise that resolves the ID of the newly created user.
     */
    static async create(data) {
        const query = `INSERT INTO user (name, lastname, email, password, created_at) VALUES (?, ?, ?, ?, NOW())`;
        const result = await Query.runWithParams(query, [data.name, data.lastname, data.email, data.password]);
        return result.insertId;
    }
    /** 
     * Updates an existing user in the database.
     * @param {int} id - The ID of the user to update.
     * @param {Object} data - The data to update in the user.
     * @returns {Promise<void>} - A promise that resolves when the update is complete.
     */
    static async update(id, data) {
        const query = `UPDATE user SET name = ?, lastname = ?, email = ?, password = ? WHERE id = ?`;
        await Query.runWithParams(query, [data.name, data.lastname, data.email, data.password, id]);
    }
    /** 
     * Deletes a user from the database.
     * @param {int} id - The ID of the user to remove.
     * @returns {Promise<void>} - A promise that resolves when the removal is complete.
     */
    static async delete(id) {
        const query = `DELETE FROM user WHERE id = ?`;
        await Query.runWithParams(query, [id]);
    }
}

export default Auth;
