import type { PageServerLoad } from './$types';
import * as db from '$lib/server/database';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, parent }) => {
	console.log('page.server.js - load');
	const { posts, loggedInUser } = await parent();
	const [post] = posts.filter((p: Post) => p.id === parseInt(params.slug));
	return {
		pageTitle: 'Dongeun Paeng | ' + post.title,
		post,
		loggedInUser
	};
};

/** @type {import('./$types').Actions} */
export const actions = {
	edit: async ({ request }) => {
		console.log('page.server.js - edit');
		const data = await request.formData();
		const title = data.get('title') as string;
		const post = data.get('post') as string;
		const type = data.get('type') as unknown as number;
		const status = data.get('status') as unknown as number;
		const postId = data.get('postId') as unknown as number;
		const authorId = data.get('authorId') as unknown as number;
		const loggedInUserId = Number(data.get('loggedInUserId'));

		if (loggedInUserId !== authorId) return fail(500, {
			incorrect: true,
			message: 'Token이 유효하지 않습니다.'
		});

		try {
			await db.editPost(title, post, type, status, postId);
			return { success: true };
		} catch (error: any) {
			console.log('Edit 실패, 사유:', error.message);
			return fail(500, { incorrect: true, message: error });
		}
	},
	delete: async ({ request, cookies }) => {
		console.log('page.server.js - delete');
		const data = await request.formData();
		const postId = Number(data.get('postId'));
		const authorId = Number(data.get('authorId'));
		const loggedInUserId = Number(data.get('loggedInUserId'));

		if (loggedInUserId !== authorId) return fail(500, {
			incorrect: true,
			message: 'Token이 유효하지 않습니다.'
		});

		try {
			await db.deletePost(loggedInUserId, postId);
			return { success: true };
		} catch (error: any) {
			console.log('Delete 실패. 사유:', error.message);
			return fail(500, { incorrect: true, message: error.message });
		}
	}
};
