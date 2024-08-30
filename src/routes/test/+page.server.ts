import type { PageServerLoad } from './$types';
import * as db from '$lib/server/database';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	let contents = (await db.readTemp() as unknown as string[]);
	console.log('load runs with', contents);
	return { contents };
};

/** @type {import('./$types').Actions} */
export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const content = data.get('content') as string;
		console.log('default runs with', content);
		try {
			await db.createTemp(content);
			return { success: true };
		} catch (error: any) {
			console.log('Create 실패:', error.message);
			return fail(500, { incorrect: true, message: error.message });
		}
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as unknown as number;
		console.log('default runs with', id);
		try {
			await db.deleteTemp(id);
			return { success: true };
		} catch (error: any) {
			console.log('Create 실패:', error.message);
			return fail(500, { incorrect: true, message: error.message });
		}
	}
};
