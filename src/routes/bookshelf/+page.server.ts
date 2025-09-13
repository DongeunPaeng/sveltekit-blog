import type { PageServerLoad } from '../../../.svelte-kit/types/src/routes/$types';
import { GOOGLE_API_KEY } from '$env/static/private';
import { fail } from '@sveltejs/kit';

type Book = { 단계: string } & Record<string, string>

export const load: PageServerLoad = async ({ parent }) => {
	try {
		const { pageTitle, verifiedUser } = await parent();
		const baseUrl: string = 'https://sheets.googleapis.com/v4/spreadsheets/';
		const spreadsheetId: string = '1e3iKWRYHLQgT_xxEpoyVyS8YhPZq_BMZZo856krlhcc/';
		const range: string = 'Books!A:K';
		const fullUrl = baseUrl + spreadsheetId + 'values/' + range + '?key=' + GOOGLE_API_KEY;

		const response = await fetch(fullUrl);
		const json = await response.json();
		const [columnName, ...rows] = json.values;
		const books: Book[] = rows.map((row: Array<string>) => (
			row.reduce((a, b, index) => ({ ...a, [columnName[index]]: b }), {})));
		const filteredBooks = books.filter(book => book['단계'] === '완독');
		return {
			pageTitle: `${pageTitle} | 책장`,
			books: filteredBooks
		};
	} catch (error: any) {
		return fail(500, { incorrect: true, message: error.message });
	}
};