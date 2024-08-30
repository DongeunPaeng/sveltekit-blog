import { fail, redirect } from '@sveltejs/kit';
import * as db from '$lib/server/database';
import { createToken, verifyPassword, verifyToken } from '$lib/server/auth';
import { jwtDecode } from 'jwt-decode';
import type { PageServerLoad } from '../../../.svelte-kit/types/src/routes/draft/$types';

export const prerender = false;

export const load: PageServerLoad = async ({ parent }) => {
	const { loggedInUser } = await parent();
	if (loggedInUser) throw redirect(307, '/');
	console.log('로그인 화면에 진입했습니다.');
};

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ request, cookies }) => {
		// Get data
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;
		const queryResults = await db.getUser(email) as User[];

		// Check if the user exists
		const user = queryResults[0];
		if (!user || user['deleted'] === 1)
			return fail(403, { incorrect: true, message: '아이디가 존재하지 않아요.' });

		// Check if the password is valid
		const passwordIsValid: boolean = await verifyPassword(password, user.password);
		if (!passwordIsValid)
			return fail(403, { incorrect: true, message: '비밀번호가 일치하지 않아요.' });

		// Create tokens
		const token = createToken(user);
		const tokenExpiresAt = jwtDecode(token).exp;

		// Set the tokens in a cookie
		cookies.set('user_token', token, {
			maxAge: 168 * 60 * 60 * 1000, // one week
			httpOnly: true
		});
		return { success: true, user: user.email };
	},
	logout: async ({ cookies }) => {
		cookies.delete('user_token');
	}
};
