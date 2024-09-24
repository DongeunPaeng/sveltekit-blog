import mysql, { type Pool, type ResultSetHeader, type RowDataPacket } from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD } from '$env/static/private';

export const pool: Pool = mysql.createPool({
	host: DB_HOST,
	user: DB_USER,
	password: DB_PASSWORD,
	database: DB_NAME
});

const enum POST_STATUS {
	PUBLIC,
	PRIVATE,
}

const enum POST_TYPE {
	GENERAL,
	STUDY,
	BOOK_REVIEW,
	PHOTO
}

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
	const [rows] = await query(`select * from posts where status = ${POST_STATUS.PUBLIC}`);
	return rows;
};

export const getPost = async (id: string) => {
	const [rows] = await query(`select * from posts where id = ?`, [id]) as RowDataPacket[];
	return rows[0];
};

export const getNextPost = async (createdAt: Date, type: number) => {
	const [rows] = await query(`select * from posts where DATE_SUB(created_at, INTERVAL 9 HOUR) > ? and status = ${POST_STATUS.PUBLIC} and type = ? order by created_at limit 1`, [createdAt.toISOString(), '' + type]) as RowDataPacket[];
	return rows[0];
};

export const getPreviousPost = async (createdAt: Date, type: number) => {
	const [rows] = await query(`select * from posts where DATE_SUB(created_at, INTERVAL 9 HOUR) < ? and status = ${POST_STATUS.PUBLIC} and type = ? order by created_at desc limit 1`, [createdAt.toISOString(), '' + type]) as RowDataPacket[];
	return rows[0];
};


export const getDrafts = async (author: number) => {
	const [rows] = await query(`select * from posts where author = ? and status != ${POST_STATUS.PUBLIC}`, ['' + author]);
	return rows;
};

export const getUser = async (email: string) => {
	const [rows] = await query(`select * from users where email = ?`, [email]);
	return rows;
};

export const writePost = async (title: string, post: string, type: string, status: string, authorId: number) => {
	// @ts-ignore
	const typeNumeric = POST_TYPE[type];
	// @ts-ignore
	const statusNumeric = POST_STATUS[status];
	const [rows] = await query(`insert into posts (author, post, title, type, status, created_at) values (?, ?, ?, ?, ?, now())`, ['' + authorId, post, title, typeNumeric, statusNumeric]) as ResultSetHeader[];
	if (rows.affectedRows !== 1) throw new Error('영향 받은 데이터가 없습니다.');
	return;
};

export const editPost = async (title: string, post: string, type: string, status: string, postId: number) => {
	// @ts-ignore
	const typeNumeric = POST_TYPE[type];
	// @ts-ignore
	const statusNumeric = POST_STATUS[status];
	const [rows] = await query(`update posts set title = ?, post = ?, type = ?, status = ? where id = ?`, [title, post, typeNumeric, statusNumeric, '' + postId]) as ResultSetHeader[];
	if (rows.affectedRows !== 1) throw new Error('영향 받은 데이터가 없습니다.');
	return;
};

export const deletePost = async (author: number, postId: number) => {
	const [rows] = await query(`update posts set status = ${POST_STATUS.PRIVATE} where id = ? and author = ?`, ['' + postId, '' + author]) as ResultSetHeader[];
	if (rows.affectedRows !== 1) throw new Error('영향 받은 데이터가 없습니다.');
	return;
};

export const readExcerpts = async () => {
	const [rows] = await query(`select * from excerpts where deleted = 0`) as ResultSetHeader[];
	return rows;
};

export const readOneExcerpt = async (id: string) => {
	const [rows] = await query(`select * from excerpts where id = ?`, [id]) as ResultSetHeader[];
	return rows;
};

export const createExcerpt = async (content: string) => {
	const [rows] = await query(`insert into excerpts (content) values (?)`, [content]) as ResultSetHeader[];
	if (rows.affectedRows !== 1) throw new Error('영향 받은 데이터가 없습니다.');
	return;
};

export const deleteExcerpt = async (id: number) => {
	const [rows] = await query(`update excerpts set deleted = 1 where id = ?`, ['' + id]) as ResultSetHeader[];
	if (rows.affectedRows !== 1) throw new Error('영향 받은 데이터가 없습니다.');
	return;
};

export const editExcerpt = async (id: number, content: string) => {
	const [rows] = await query(`update excerpts set content = ? where id = ?`, [content, '' + id]) as ResultSetHeader[];
	if (rows.affectedRows !== 1) throw new Error('영향 받은 데이터가 없습니다.');
	return;
};
