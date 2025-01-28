import type { PageServerLoad } from './$types';
import * as db from '$lib/server/database';
import { addPreview } from '$lib/common';
import type { Post } from '$lib/types';
import logWithTime from '$lib/utils/log';

export const load: PageServerLoad = async () => {
	logWithTime('start loading');
	const posts: Post[] = (await db.getPosts()) as Post[];
	logWithTime('received posts');
	const postsWithPreview: (Post & { preview: string })[] = posts.map((p: Post) => addPreview(p));

	return {
		pageTitle: 'Dongeun Paeng | Home',
		posts: postsWithPreview.sort((a: Post, b: Post) => (a.created_at > b.created_at ? -1 : 1))
	};
};
