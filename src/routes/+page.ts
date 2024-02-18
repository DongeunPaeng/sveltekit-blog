import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { posts } = await parent();
	return {
		pageTitle: 'Dongeun Paeng | Home',
		posts: posts.sort((a: Post, b: Post) => (a.created_at > b.created_at ? -1 : 1))
	};
};
