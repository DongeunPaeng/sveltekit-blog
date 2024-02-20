import type { PageLoad } from './$types';
import { parse } from 'node-html-parser';

export const load: PageLoad = async ({ parent }) => {
	const { posts } = await parent();

	const stringify = (obj: any): string => '' + obj;

	const getPreview = (post: Post) => {
		const doc = parse(stringify(post.post));
		return doc.getElementsByTagName('p')[0].rawText?.slice(0, 80) ?? '...';
	};

	const addPreview = (post: Post): Post => ({ preview: getPreview(post), ...post });

	const postsWithPreview: Post[] = posts.map((p: Post) => addPreview(p));

	return {
		pageTitle: 'Dongeun Paeng | Home',
		posts: postsWithPreview.sort((a: Post, b: Post) => (a.created_at > b.created_at ? -1 : 1))
	};
};
