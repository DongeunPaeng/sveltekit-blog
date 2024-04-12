declare global {
	interface Post {
		id: number;
		author: number;
		title: string;
		post: string;
		created_at: Date;
		status: number;
		type: number;
		preview?: string;
	}
	enum Deleted {
		NO,
		YES
	}
	interface User {
		id: numnber;
		email: string;
		password: string;
		created_at: Date;
		first_letter: string;
		last_letter: string;
		length: number;
		deleted: Deleted;
	}
	enum VerificationType {
		REFRESH = 'refresh',
		ACCESS = 'access'
	}
	namespace App {
		interface PageData {
			pageTitle: string;
			posts: Post[];
		}
	}
}

export {};
