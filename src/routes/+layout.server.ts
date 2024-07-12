import type { LayoutServerLoad } from './$types';
import * as db from '$lib/server/database';

const posts = (await db.getPosts()) as Post[];

export const load: LayoutServerLoad = ({ cookies }) => {
	return {
		pageTitle: 'Dongeun Paeng',
		posts,
		loggedIn: !!cookies.get('user_token')
	};
};
