import type { PageServerLoad } from './$types';
import * as db from '$lib/server/database';

const drafts = (await db.getDrafts()) as Post[];

export const load: PageServerLoad = async () => {
	return {
		pageTitle: 'Dongeun Paeng | Draft',
		posts: drafts.sort((a: Post, b: Post) => (a.created_at > b.created_at ? -1 : 1))
	};
};
