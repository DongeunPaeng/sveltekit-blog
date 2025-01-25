import mysql, { type Pool, type ResultSetHeader, type RowDataPacket } from 'mysql2/promise';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from '$env/static/private';
import { type Excerpt, type Post, POST_STATUS, POST_TYPE, type User } from '$lib/types';

export const pool: Pool = mysql.createPool({
	host: DB_HOST,
	user: DB_USER,
	password: DB_PASSWORD,
	database: DB_NAME,
	connectionLimit: 10
});

const query = async (queryString: string, args: (string | number)[] = []) => {
	let connection;
	try {
		connection = await pool.getConnection();
		return await connection.query(queryString, args);
	} catch (error) {
		throw error;
	} finally {
		if (connection) connection.release();
	}
};

export const getPosts = async (): Promise<Array<Post>> => {
	const [rows] = await query(`select id, author, title, post, created_at, status, type from posts where status = ${POST_STATUS.PUBLIC}`);
	return rows as Array<Post>;
};

export const getPost = async (id: string): Promise<Post> => {
	const [rows] = await query(`select * from posts where id = ? and status = ${POST_STATUS.PUBLIC}`, [id]) as RowDataPacket[];
	return rows[0] as Post;
};

export const getNextPost = async (createdAt: Date, type: number): Promise<Post> => {
	const [rows] = await query(`select * from posts where DATE_SUB(created_at, INTERVAL 9 HOUR) > ? and status = ${POST_STATUS.PUBLIC} and type = ? order by created_at limit 1`, [createdAt.toISOString(), '' + type]) as RowDataPacket[];
	return rows[0] as Post;
};

export const getPreviousPost = async (createdAt: Date, type: number): Promise<Post> => {
	const [rows] = await query(`select * from posts where DATE_SUB(created_at, INTERVAL 9 HOUR) < ? and status = ${POST_STATUS.PUBLIC} and type = ? order by created_at desc limit 1`, [createdAt.toISOString(), '' + type]) as RowDataPacket[];
	return rows[0] as Post;
};


export const getDrafts = async (authorId: number): Promise<Array<Post>> => {
	const [rows] = await query(`select * from posts where author = ? and status = ${POST_STATUS.PRIVATE}`, ['' + authorId]);
	return rows as Array<Post>;
};

export const getDraft = async (id: string, authorId: number): Promise<Post> => {
	const [rows] = await query(`select * from posts where id = ? and author = ?`, [id, '' + authorId]) as RowDataPacket[];
	return rows[0] as Post;
};

export const getUser = async (email: string): Promise<User> => {
	const [rows] = await query(`select * from users where email = ?`, [email]) as RowDataPacket[];
	return rows[0] as User;
};

export const writePost = async (title: string, post: string, type: string, status: string, authorId: string): Promise<void> => {
	const typeNumeric: POST_TYPE = POST_TYPE[type as keyof typeof POST_TYPE];
	const statusNumeric: POST_STATUS = POST_STATUS[status as keyof typeof POST_STATUS];
	const [rows] = await query(`insert into posts (author, post, title, type, status, created_at) values (?, ?, ?, ?, ?, now())`, [authorId, post, title, '' + typeNumeric, '' + statusNumeric]) as ResultSetHeader[];
	if (rows.affectedRows !== 1) throw new Error('영향 받은 데이터가 없습니다.');
	return;
};

export const editPost = async (title: string, post: string, type: string, status: string, postId: number): Promise<void> => {
	const typeNumeric: POST_TYPE = POST_TYPE[type as keyof typeof POST_TYPE];
	const statusNumeric: POST_STATUS = POST_STATUS[status as keyof typeof POST_STATUS];
	const [rows] = await query(`update posts set title = ?, post = ?, type = ?, status = ? where id = ?`, [title, post, '' + typeNumeric, '' + statusNumeric, '' + postId]) as ResultSetHeader[];
	if (rows.affectedRows !== 1) throw new Error('영향 받은 데이터가 없습니다.');
	return;
};

export const deletePost = async (author: number, postId: number): Promise<void> => {
	const [rows] = await query(`update posts set status = 1 where id = ? and author = ?`, ['' + postId, '' + author]) as ResultSetHeader[];
	if (rows.affectedRows !== 1) throw new Error('영향 받은 데이터가 없습니다.');
	return;
};

export const readExcerpts = async (): Promise<Array<Excerpt>> => {
	const [rows] = await query(`select * from excerpts where deleted = 0`);
	return rows as Array<Excerpt>;
};

export const readOneExcerpt = async (id: string): Promise<Excerpt> => {
	const [rows] = await query(`select * from excerpts where id = ? and deleted = 0`, [id]) as RowDataPacket[];
	return rows[0] as Excerpt;
};

export const createExcerpt = async (content: string): Promise<void> => {
	const [rows] = await query(`insert into excerpts (content) values (?)`, [content]) as ResultSetHeader[];
	if (rows.affectedRows !== 1) throw new Error('영향 받은 데이터가 없습니다.');
	return;
};

export const deleteExcerpt = async (id: number): Promise<void> => {
	const [rows] = await query(`update excerpts set deleted = 1 where id = ?`, ['' + id]) as ResultSetHeader[];
	if (rows.affectedRows !== 1) throw new Error('영향 받은 데이터가 없습니다.');
	return;
};

export const editExcerpt = async (id: number, content: string) => {
	const [rows] = await query(`update excerpts set content = ? where id = ?`, [content, '' + id]) as ResultSetHeader[];
	if (rows.affectedRows !== 1) throw new Error('영향 받은 데이터가 없습니다.');
	return;
};
