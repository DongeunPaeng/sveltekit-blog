import mysql, { type Connection, type Pool, type ResultSetHeader, type RowDataPacket } from 'mysql2/promise';
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
		} finally {
			connection.release();
		}
	} catch (error) {
		throw error;
	}
};

export const getPosts = async () => {
	const [rows] = await query(`select * from posts where status = 0`);
	return rows;
};

export const getDrafts = async (author: number) => {
	const [rows] = await query(`select * from posts where author = ? and status != 0`, ['' + author]);
	return rows;
};

export const getUser = async (email: string) => {
	const [rows] = await query(`select * from users where email = ?`, [email]);
	return rows;
};

export const writePost = async (title: string, post: string, type: number, status: number, authorId: number) => {
	const [rows] = await query(`insert into posts (author, post, title, type, status, created_at) values (?, ?, ?, ?, ?, now())`, ['' + authorId, post, title, '' + type, '' + status]) as ResultSetHeader[];
	if (rows.affectedRows !== 1) throw new Error('영향 받은 데이터가 없습니다.');
	console.log(rows);
	return;
};

export const editPost = async (title: string, post: string, type: number, status: number, postId: number) => {
	// TODO: change 99999 to ? later.
	const [rows] = await query(`update posts set title = ?, post = ?, type = ?, status = ? where id = 99999`, [title, post, '' + type, '' + status, '' + postId]) as ResultSetHeader[];
	if (rows.affectedRows !== 1) throw new Error('영향 받은 데이터가 없습니다.');
	return;
};

export const deletePost = async (author: number, postId: number) => {
	const [rows] = await query(`update posts set status = 1 where id = ? and author = ?`, ['' + postId, '' + author]) as ResultSetHeader[];
	if (rows.affectedRows !== 1) throw new Error('영향 받은 데이터가 없습니다.');
	return;
};

export const readTemp = async () => {
	const [rows] = await query(`select * from temp`) as ResultSetHeader[];
	return rows;
};

export const createTemp = async (content: string) => {
	const [rows] = await query(`insert into temp (content) values (?)`, [content]) as ResultSetHeader[];
	console.log(rows);
	if (rows.affectedRows !== 1) throw new Error('영향 받은 데이터가 없습니다.');
	return;
};

export const deleteTemp = async (id: number) => {
	const [rows] = await query(`delete from temp where id = ?`, ['' + id]) as ResultSetHeader[];
	if (rows.affectedRows !== 1) throw new Error('영향 받은 데이터가 없습니다.');
	return;
};
