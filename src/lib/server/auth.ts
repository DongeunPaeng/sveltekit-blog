import jwt, { type VerifyErrors } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from '$env/static/private';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import type { User, VerifiedUser } from '$lib/types';

export const verifyPassword = (passwordAttempt: string, hashedPassword: string): Promise<boolean> =>
	bcrypt.compare(passwordAttempt, hashedPassword);

export const verifyToken = (token: string): Promise<string | JwtPayload | undefined | null> =>
	new Promise((resolve) => {
		const decodedToken: JwtPayload | null = token ? jwtDecode(token) : null;
		if (!decodedToken || !decodedToken.exp) {
			resolve(null);
			return;
		}
		if (decodedToken?.exp! * 1000 < Date.now()) {
			resolve(null);
			return;
		}
		jwt.verify(token, JWT_SECRET ?? '', (error, user) => {
			if (error) {
				console.log('쿠기가 다음 사유로 verify 되지 않았습니다 -', error.message);
				resolve(null);
			} else {
				resolve(user);
			}
		});
	});

export const createToken = (user: User): string => {
	const payload: { sub: number, email: string } = { sub: user.id, email: user.email };
	return jwt.sign(payload, JWT_SECRET, {
		algorithm: 'HS256',
		expiresIn: '168h'
	});
};
