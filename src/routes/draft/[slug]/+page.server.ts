import type { PageServerLoad } from './$types';
import * as db from '$lib/server/database';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, parent }) => {
	const { loggedInUser } = await parent();
	if (!loggedInUser) throw redirect(307, '/');

	const draft = await db.getPost(params.slug) as unknown as Post;

	return {
		pageTitle: 'Dongeun Paeng | ' + draft.title,
		draft,
		loggedInUser
	};
};