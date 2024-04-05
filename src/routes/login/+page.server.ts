import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');
		// TODO: cf. database.ts
		const user = { id: 'dongeun.paeng@gmail.com', password: '123123' };
		if (!true) {
			return fail(403, { incorrect: true });
		}
		return { success: true };
	}
};
