import type { LayoutServerLoad } from './$types';
import { verifyToken } from '$lib/server/auth';
import type { VerifiedUser } from '$lib/types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const verifiedUser = await verifyToken(cookies.get('user_token') || '') as VerifiedUser | null;
	return {
		pageTitle: 'Dongeun Paeng',
		verifiedUser
	};
};