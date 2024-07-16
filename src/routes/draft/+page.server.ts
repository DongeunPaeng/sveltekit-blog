import type { PageServerLoad } from './$types';
import * as db from '$lib/server/database';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ parent }) => {
	const { loggedInUser } = await parent();
	if (!loggedInUser) throw redirect(307, '/');
	const drafts = (await db.getDrafts('' + loggedInUser.sub)) as Post[];
	return {
		pageTitle: 'Dongeun Paeng | Draft',
		posts: drafts.sort((a: Post, b: Post) => (a.created_at > b.created_at ? -1 : 1))
	};
};
