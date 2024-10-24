export type User = {
	id: number
	email: string
	created_at: Date
	password: string
	deleted: 0 | 1
	first_letter: string
	last_letter: string
	length: number
}

export type VerifiedUser = {
	sub: number
	email: string
	iat: number
	exp: number
}

export type Post = {
	id: number
	author: number
	title: string
	post: string
	created_at: Date
	status: POST_STATUS
	type: POST_TYPE
}

export enum POST_STATUS {
	PUBLIC,
	PRIVATE
}

export enum POST_TYPE {
	GENERAL,
	STUDY,
	BOOK_REVIEW,
	PHOTO
}

export type Excerpt = {
	id: number
	content: string
	deleted: 0 | 1
}

export type Page = {
	name: string
	href: string
}

export type Lists = {
	[key: string]: Array<string>
}