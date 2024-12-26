import { db } from '../database/connection.database.js';

export const executeQuery = async (query, values) => {
    try {
        const { rows } = await db.query({ text: query, values });
        return rows;
    } catch (error) {
        console.error('[Database Error] ', error);
        throw error;
    }
};