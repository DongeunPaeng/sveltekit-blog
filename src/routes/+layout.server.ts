import type { LayoutServerLoad } from './$types';
import { verifyToken } from '$lib/server/auth';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const verifiedUser = await verifyToken(cookies.get('user_token') || '');
	return {
		pageTitle: 'Dongeun Paeng',
		loggedInUser: verifiedUser
	};
};