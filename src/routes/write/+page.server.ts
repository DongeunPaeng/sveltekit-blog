import type { PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import * as db from '$lib/server/database';
import { verifyToken } from '$lib/server/auth';
import { checkEmptyPost } from '$lib/common';
import type { VerifiedUser } from '$lib/types';

export const load: PageServerLoad = async ({ parent }) => {
	const { pageTitle, verifiedUser } = await parent();
	if (!verifiedUser) throw redirect(307, '/');

	return {
		pageTitle: `${pageTitle} | Write`
	};
};

export const actions = {
	write: async ({ request }) => {
		const data = await request.formData();
		const title = data.get('title') as string;
		const post = data.get('content') as string;
		const type = data.get('type') as string;
		const status = data.get('status') as string;
		const authorId = data.get('authorId') as string;

		if (checkEmptyPost(title)) return fail(400, { incorrect: true, message: '제목을 채워주세요.' });
		if (checkEmptyPost(post)) return fail(400, { incorrect: true, message: '내용을 채워주세요.' });

		try {
			await db.writePost(title, post, type, status, authorId);
		} catch (error: any) {
			console.log('Write 실패. 사유:', error.message);
			return fail(500, { incorrect: true, message: error.message });
		}
		throw redirect(301, '/' as string);
	},
	edit: async ({ request, cookies }) => {
		const data = await request.formData();
		const title = data.get('title') as string;
		const post = data.get('content') as string;
		const type = data.get('type') as string;
		const status = data.get('status') as string;
		const postId = data.get('postId') as unknown as number;

		if (checkEmptyPost(title)) return fail(400, { incorrect: true, message: '제목을 채워주세요.' });
		if (checkEmptyPost(post)) return fail(400, { incorrect: true, message: '글 내용을 채워주세요.' });

		try {
			console.log('DB에 집어넣는 중...');
			await db.editPost(title, post, type, status, postId);
		} catch (error: any) {
			console.log('Edit 실패, 사유:', error.message);
			return fail(500, { incorrect: true, message: error.message });
		}
		throw redirect(301, `/posts/${postId}` as string);
	}
};
