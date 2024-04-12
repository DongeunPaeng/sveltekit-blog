import type { LayoutServerLoad } from './$types';
import * as db from '$lib/server/database';

const posts = (await db.getPosts()) as Post[];

export const load: LayoutServerLoad = () => ({
	pageTitle: 'Dongeun Paeng',
	posts
});
