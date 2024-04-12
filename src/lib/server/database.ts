import mysql, { type Connection, type Pool } from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD } from '$env/static/private';

export const pool: Pool = mysql.createPool({
	host: DB_HOST,
	user: DB_USER,
	password: DB_PASSWORD,
	database: DB_NAME
});

const query = async (queryString: string, args: string[] = []) => {
	try {
		const connection = await pool.getConnection();
		try {
			return connection.query(queryString, args);
		} catch (error) {
			throw new Error(error as string);
		} finally {
			connection.release();
		}
	} catch (error) {
		throw new Error(error as string);
	}
};

export const getPosts = async () => {
	const [rows] = await query(`select * from posts where status = 0`);
	return rows;
};

export const getDrafts = async () => {
	const [rows] = await query(`select * from posts where status != 0`);
	return rows;
};

export const getUser = async (email: string) => {
	const [rows] = await query(`select * from users where email = ?`, [email]);
	return rows;
};
