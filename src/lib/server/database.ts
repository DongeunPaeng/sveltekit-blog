import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD } from '$env/static/private';

const connection = await mysql.createConnection({
	host: DB_HOST,
	user: DB_USER,
	password: DB_PASSWORD,
	database: DB_NAME
});

export const getPosts = async () => {
	const [rows] = await connection.execute(`select * from posts where status = 0;`);
	return rows;
};

export const getDrafts = async () => {
	const [rows] = await connection.execute(`select * from posts where status != 0;`);
	return rows;
};
