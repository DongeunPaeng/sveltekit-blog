import type { PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import * as db from '$lib/server/database';
import { verifyToken } from '$lib/server/auth';

export const prerender = false;

export const load: PageServerLoad = async ({ parent }) => {
	const { loggedInUser } = await parent();
	if (!loggedInUser) throw redirect(307, '/');
	return {
		pageTitle: 'Dongeun Paeng | Write'
	};
};

export const actions = {
	write: async ({ request, cookies }) => {
		const verifiedUser = await verifyToken(cookies.get('user_token') || '');
		if (!verifiedUser) return fail(500);

		// Get data
		const data = await request.formData();
		const title = data.get('title') as string;
		const post = data.get('content') as string;
		const type = data.get('type') as unknown as number;
		const status = data.get('status') as unknown as number;
		const authorId = verifiedUser.sub;

		// Save the data in the database
		await db.writePost(title, post, type, status, authorId);

		// Set the tokens in a cookie
		return { success: true };
	}
};
