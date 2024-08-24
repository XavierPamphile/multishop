import pool from "../config/db.js";

class Query {
    /** 
     * Executes a SQL query without parameters.
     * @param {string} query - The SQL query to execute.
     * @returns {Promise<Array>} - A promise that resolves to the result of the query or an error.
     */
    static async run(query) {
        const [result] = await pool.query(query);
        return result;
    }

    /** 
     * Executes a SQL query with parameters.
     * @param {string} query - The SQL query to execute.
     * @param {Object} data - The parameters for the SQL query.
     * @returns {Promise<Array>} - A promise that resolves to the result of the query or an error.
     */
    static async runWithParams(query, data) {   
        const [result] = await pool.execute(query, Object.values(data));
        return result;
    }
}

export default Query;
