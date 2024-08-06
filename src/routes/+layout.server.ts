import type { LayoutServerLoad } from './$types';
import * as db from '$lib/server/database';
import { verifyToken } from '$lib/server/common';

export const prerender = true;
console.log('layout.server.ts runs'); // TODO: check if this runs when refresh.

const posts = (await db.getPosts()) as Post[];

export const load: LayoutServerLoad = async ({ cookies }) => {
	const verifiedUser = await verifyToken(cookies.get('user_token') || '');
	return {
		pageTitle: 'Dongeun Paeng',
		posts,
		loggedInUser: verifiedUser
	};
};