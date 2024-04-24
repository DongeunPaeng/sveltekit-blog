import { fail } from '@sveltejs/kit';
import * as db from '$lib/server/database';
import { createToken, verifyPassword } from '$lib/server/common';
import { jwtDecode } from 'jwt-decode';
import { VerificationType } from '$types';

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ request, cookies }) => {
		try {
			const data = await request.formData();
			const email = data.get('email') as string;
			const password = data.get('password') as string;
			const queryResults = (await db.getUser(email)) as User[];
			const user = queryResults[0];
			if (!user || user['deleted'] === 1)
				return fail(403, { incorrect: true, message: '아이디가 존재하지 않아요.' });
			const passwordIsValid: boolean = await verifyPassword(password, user.password);
			if (!passwordIsValid)
				return fail(403, { incorrect: true, message: '비밀번호가 일치하지 않아요.' });
			const refreshToken = createToken(user, VerificationType.REFRESH);
			const accessToken = createToken(user, VerificationType.ACCESS);
			const decodedAccessToken = jwtDecode(accessToken);
			const accessTokenExpiresAt = decodedAccessToken.exp;
			cookies.set('refresh_token', refreshToken, {
				maxAge: 168 * 60 * 60 * 1000, // FIXME: I want to manage this as a global variable.
				httpOnly: true
			});
			return { success: true, data: { user, accessToken, accessTokenExpiresAt } };
		} catch (error) {
			console.log(error);
			return fail(500, { message: '서버가 고장났어요! ' + error });
		}
	}
};
