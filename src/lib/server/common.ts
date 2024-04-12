import { fail } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { jwtDecode } from 'jwt-decode';
import { JWT_SECRET } from '$env/static/private';

export const verifyPassword = (passwordAttempt: string, hashedPassword: string) =>
	bcrypt.compare(passwordAttempt, hashedPassword);

// TODO: is this a SvelteKit way?
// export const verifyToken = (req, next) => {
// 	const authHeader = req.headers['authorization'];
// 	const token = authHeader && authHeader.split(' ')[1];
// 	const decodedToken = token ? jwtDecode(token) : null;
//
// 	if (!token || !decodedToken || decodedToken?.exp! * 1000 < Date.now())
// 		return fail(401, { notAuthorized: true, message: '권한이 없습니다.' });
//
// 	jwt.verify(token, process.env.JWT_SECRET ?? '', async (err: any, user: any) => {
// 		if (err) return fail(403, { notAuthorized: true, message: '권한이 없습니다.' });
// 		req.user = user;
// 		// TODO: is this a SvelteKit way? How do I setup a middleware?
// 		next();
// 	});
// };

// TODO: VerificationType is not defined. How do I use global types in SvelteKit? I can't search how to.
export const createToken = (user: User, type: VerificationType) => {
	const payload = { sub: user.id, email: user.email };
	const token = jwt.sign(payload, JWT_SECRET, {
		algorithm: 'HS256',
		// expiration of access token is very short, while refresh token remains long.
		expiresIn: type === VerificationType.REFRESH ? '168h' : '1h'
	});
	return token;
};
