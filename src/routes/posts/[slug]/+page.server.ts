import type { PageServerLoad } from './$types';
import * as db from '$lib/server/database';
import { fail, redirect } from '@sveltejs/kit';
import { addPreview } from '$lib/common';
import type { Post } from '$lib/types';

export const load: PageServerLoad = async ({ params }) => {
	const post: Post = await db.getPost(params.slug);
	if (!post) throw redirect(301, '/');
	const [nextPost, previousPost] = await Promise.all([
		await db.getNextPost(post.created_at, post.type),
		await db.getPreviousPost(post.created_at, post.type)
	]);
	const nextPostWithPreview: Post & { preview: string } = nextPost && addPreview(nextPost);
	const previousPostWithPreview: Post & { preview: string } = previousPost && addPreview(previousPost);

	return {
		pageTitle: 'Dongeun Paeng | ' + post.title,
		post,
		nextPost: nextPostWithPreview,
		previousPost: previousPostWithPreview
	};
};

/** @type {import('./$types').Actions} */
export const actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const postId = data.get('postId');
		const authorId = data.get('authorId');
		const verifiedUserId = data.get('verifiedUserId');

		if (verifiedUserId !== authorId) {
			console.log('user mismatch!');

			return fail(500, {
				incorrect: true,
				message: 'Token이 유효하지 않습니다.'
			});
		}

		try {
			await db.deletePost(authorId as unknown as number, postId as unknown as number);
		} catch (error: any) {
			console.log('Delete 실패. 사유:', error.message);
			return fail(500, { incorrect: true, message: error.message });
		}
		throw redirect(301, '/' as string);
	}
};
