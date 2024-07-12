import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { verifyToken } from '$lib/server/common';

export const load: PageServerLoad = async ({ cookies }) => {
	const user_token = cookies.get('user_token') || '';
	if (!verifyToken(user_token)) throw redirect(307, '/');
	return {
		pageTitle: 'Dongeun Paeng | Write'
	};
};
