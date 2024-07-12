import type { PageServerLoad } from './$types';
import * as db from '$lib/server/database';
import { redirect } from '@sveltejs/kit';
import { verifyToken } from '$lib/server/common';

const drafts = (await db.getDrafts()) as Post[];

export const load: PageServerLoad = async ({ cookies }) => {
	const user_token = cookies.get('user_token') || '';
	if (!verifyToken(user_token)) throw redirect(307, '/');
	return {
		pageTitle: 'Dongeun Paeng | Draft',
		posts: drafts.sort((a: Post, b: Post) => (a.created_at > b.created_at ? -1 : 1))
	};
};
