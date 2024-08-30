import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from '$env/static/private';
import { jwtDecode } from 'jwt-decode';

export const verifyPassword = (passwordAttempt: string, hashedPassword: string): Promise<boolean> =>
	bcrypt.compare(passwordAttempt, hashedPassword);

export interface UserDecoded {
	sub: number;
	email: string;
	iat: number;
	exp: number;
}

export const verifyToken = (token: string): Promise<null | UserDecoded> => {
	return new Promise((resolve) => {
		try {
			const decodedToken = token ? jwtDecode(token) : null;
			jwt.verify(token, JWT_SECRET ?? '', (error, user) => {
				if (error) {
					console.log('쿠기가 다음 사유로 verify 되지 않았습니다 -', error.message);
					resolve(null);
				} else {
					resolve(user as unknown as UserDecoded);
				}
			});
		} catch (error: any) {
			console.log('쿠기가 다음 사유로 verify 되지 않았습니다 -', error.message);
			resolve(null);
		}
	});
};

export const createToken = (user: User) => {
	const payload = { sub: user.id, email: user.email };
	return jwt.sign(payload, JWT_SECRET, {
		algorithm: 'HS256',
		expiresIn: '168h'
	});
};
