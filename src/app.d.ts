declare global {
	namespace App {
		interface PageData {
			pageTitle: string;
			posts: Post[];
		}
	}
}

export {};
