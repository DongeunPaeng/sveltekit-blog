import type { PageServerLoad } from './$types';
import * as db from '$lib/server/database';
import { fail, redirect } from '@sveltejs/kit';
import { verifyToken } from '$lib/server/auth';

export const load: PageServerLoad = async ({ params, parent }) => {
	const { loggedInUser, pageTitle } = await parent();
	if (!loggedInUser) throw redirect(307, '/');
	const result = await db.readOneExcerpt(params.slug) as unknown as any[];
	const content = result[0];
	return {
		content,
		pageTitle: `${pageTitle} | 발췌 (수정)`
	};
};

/** @type {import('./$types').Actions} */
export const actions = {
	edit: async ({ cookies, request }) => {
		const verifiedUser = await verifyToken(cookies.get('user_token') || '');
		if (!verifiedUser) return fail(500);

		const data = await request.formData();
		const id = data.get('id') as unknown as number;
		const content = data.get('content') as string;
		try {
			await db.editExcerpt(id, content);
		} catch (error: any) {
			console.log('Edit 실패:', error.message);
			return fail(500, { incorrect: true, message: error.message });
		}
		throw redirect(301, '/excerpts' as string);
	}
};
