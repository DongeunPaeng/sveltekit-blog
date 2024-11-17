import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { pageTitle } = await parent();
	return {
		pageTitle: `${pageTitle} | 자기소개`
	};
};
