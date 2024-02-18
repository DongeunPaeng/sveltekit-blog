import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
	const { posts } = await parent();
	const [post] = posts.filter((p: Post) => p.id === parseInt(params.slug));
	return {
		pageTitle: 'Dongeun Paeng | ' + post.title,
		post
	};
};
