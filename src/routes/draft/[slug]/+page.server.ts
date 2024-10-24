import type { PageServerLoad } from './$types';
import * as db from '$lib/server/database';
import { redirect } from '@sveltejs/kit';
import type { Post } from '$lib/types';

export const load: PageServerLoad = async ({ params, parent }) => {
	const { verifiedUser } = await parent();
	if (!verifiedUser) throw redirect(307, '/');

	const draft: Post = await db.getDraft(params.slug, verifiedUser.sub);
	if (!draft) throw redirect(301, '/draft');

	return {
		pageTitle: 'Dongeun Paeng | ' + draft.title,
		draft,
		verifiedUser
	};
};