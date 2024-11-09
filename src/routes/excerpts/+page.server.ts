import type { PageServerLoad } from './$types';
import * as db from '$lib/server/database';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ parent }) => {
	const { pageTitle } = await parent();
	let excerpts = await db.readExcerpts();
	return {
		pageTitle: `${pageTitle} | 교훈`,
		excerpts
	};
};

/** @type {import('./$types').Actions} */
export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const content = data.get('content') as string;
		try {
			await db.createExcerpt(content);
			return { success: true };
		} catch (error: any) {
			console.log('Create 실패:', error.message);
			return fail(500, { incorrect: true, message: error.message });
		}
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as unknown as number;
		try {
			await db.deleteExcerpt(id);
			return { success: true };
		} catch (error: any) {
			console.log('Delete 실패:', error.message);
			return fail(500, { incorrect: true, message: error.message });
		}
	}
};
