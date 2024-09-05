import type { PageServerLoad } from './$types';
import * as db from '$lib/server/database';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const result = await db.readOneTemp(params.slug) as unknown as any[];
	const content = result[0];
	return { content };
};

/** @type {import('./$types').Actions} */
export const actions = {
	edit: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as unknown as number;
		const content = data.get('content') as string;
		try {
			await db.editTemp(id, content);
		} catch (error: any) {
			console.log('Edit 실패:', error.message);
			return fail(500, { incorrect: true, message: error.message });
		}
		throw redirect(301, '/test' as string);
	}
};
