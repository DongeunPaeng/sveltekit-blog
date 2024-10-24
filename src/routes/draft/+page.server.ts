import type { PageServerLoad } from './$types';
import * as db from '$lib/server/database';
import { redirect } from '@sveltejs/kit';
import { addPreview } from '$lib/common';
import type { Post } from '$lib/types';

export const load: PageServerLoad = async ({ parent }) => {
	const { verifiedUser } = await parent();
	if (!verifiedUser) throw redirect(307, '/');

	const drafts = (await db.getDrafts(verifiedUser.sub)) as Post[];
	const draftsWithPreview: (Post & { preview: string })[] = drafts.map((p: Post) => addPreview(p));

	return {
		pageTitle: 'Dongeun Paeng | Draft',
		posts: draftsWithPreview.sort((a, b) => (a.created_at > b.created_at ? -1 : 1))
	};
};
