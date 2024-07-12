import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from '$env/static/private';
import { jwtDecode } from 'jwt-decode';
import { fail } from '@sveltejs/kit';

export const verifyPassword = (passwordAttempt: string, hashedPassword: string): Promise<boolean> =>
	bcrypt.compare(passwordAttempt, hashedPassword);

export const verifyToken = (token: string): boolean => {
	try {
		const decodedToken = token ? jwtDecode(token) : null;
		jwt.verify(token, JWT_SECRET ?? '');
	} catch (error: any) {
		console.log('쿠기가 다음 사유로 verify 되지 않았습니다 -', error.message);
		return false;
	}
	return true;
};

export const createToken = (user: User) => {
	const payload = { sub: user.id, email: user.email };
	return jwt.sign(payload, JWT_SECRET, {
		algorithm: 'HS256',
		expiresIn: '168h'
	});
};
