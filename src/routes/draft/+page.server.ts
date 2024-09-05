import type { PageServerLoad } from './$types';
import * as db from '$lib/server/database';
import { redirect } from '@sveltejs/kit';
import { addPreview } from '$lib/common';

export const load: PageServerLoad = async ({ parent }) => {
	const { loggedInUser } = await parent();
	if (!loggedInUser) throw redirect(307, '/');

	const drafts = (await db.getDrafts(loggedInUser.sub)) as Post[];
	const draftsWithPreview: Post[] = drafts.map((p: Post) => addPreview(p));

	return {
		pageTitle: 'Dongeun Paeng | Draft',
		posts: draftsWithPreview.sort((a: Post, b: Post) => (a.created_at > b.created_at ? -1 : 1))
	};
};
