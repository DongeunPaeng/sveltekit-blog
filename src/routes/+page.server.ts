import type { PageServerLoad } from './$types';
import * as db from '$lib/server/database';
import { addPreview } from '$lib/common';

export const load: PageServerLoad = async () => {
	const posts = (await db.getPosts()) as Post[];
	const postsWithPreview: Post[] = posts.map((p: Post) => addPreview(p));

	return {
		pageTitle: 'Dongeun Paeng | Home',
		posts: postsWithPreview.sort((a: Post, b: Post) => (a.created_at > b.created_at ? -1 : 1))
	};
};
