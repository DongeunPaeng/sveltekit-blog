import { fail, redirect } from '@sveltejs/kit';
import * as db from '$lib/server/database';
import { createToken, verifyPassword } from '$lib/server/auth';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { verifiedUser } = await parent();
	if (verifiedUser) throw redirect(307, '/');
};

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		// Get data
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;
		const user = await db.getUser(email);

		// Check if the user exists
		if (!user || user.deleted === 1)
			return fail(403, { incorrect: true, message: '아이디가 존재하지 않아요.' });

		// Check if the password is valid
		const passwordIsValid: boolean = await verifyPassword(password, user.password);
		if (!passwordIsValid)
			return fail(403, { incorrect: true, message: '비밀번호가 일치하지 않아요.' });

		// Create tokens
		const token: string = createToken(user);

		// Set the tokens in a cookie
		cookies.set('user_token', token, {
			maxAge: 168 * 60 * 60 * 1000, // one week
			httpOnly: true
		});
		throw redirect(301, '/' as string);
	},
	logout: ({ cookies }): void => {
		cookies.delete('user_token');
	}
};
