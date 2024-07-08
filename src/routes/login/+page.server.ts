import { fail } from '@sveltejs/kit';
import * as db from '$lib/server/database';
import { createToken, verifyPassword } from '$lib/server/common';
import { jwtDecode } from 'jwt-decode';
import { VerificationType } from '$types';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies }) => {
		  // Get data
			const data = await request.formData();
			const email = data.get('email') as string;
			const password = data.get('password') as string;
			const queryResults = (await db.getUser(email)) as User[];

			// Check if the user exists
			const user = queryResults[0];
			if (!user || user['deleted'] === 1)
				return fail(403, { incorrect: true, message: '아이디가 존재하지 않아요.' });

		  // Check if the password is valid
			const passwordIsValid: boolean = await verifyPassword(password, user.password);
			if (!passwordIsValid)
				return fail(403, { incorrect: true, message: '비밀번호가 일치하지 않아요.' });

			// Create tokens
			const refreshToken = createToken(user, VerificationType.REFRESH);
			const accessToken = createToken(user, VerificationType.ACCESS);
			const accessTokenExpiresAt = jwtDecode(accessToken).exp;

			// Set the tokens in a cookie
			cookies.set('refresh_token', refreshToken, {
				maxAge: 168 * 60 * 60 * 1000,
				httpOnly: true
			});

			return { success: true, data: { user, accessToken, accessTokenExpiresAt } };
	}
};
