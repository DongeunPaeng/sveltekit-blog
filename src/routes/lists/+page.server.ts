import type { PageServerLoad } from '../../../.svelte-kit/types/src/routes/$types';
import { GOOGLE_API_KEY } from '$env/static/private';

export const load: PageServerLoad = async ({ parent }) => {
	const { pageTitle } = await parent();
	const baseUrl: string = 'https://sheets.googleapis.com/v4/spreadsheets/';
	const spreadsheetId: string = '1e3iKWRYHLQgT_xxEpoyVyS8YhPZq_BMZZo856krlhcc/';
	const range: string = 'Checklists!A:B';
	const fullUrl = baseUrl + spreadsheetId + 'values/' + range + '?key=' + GOOGLE_API_KEY;

	const response = await fetch(fullUrl);
	const json = await response.json();
	const rows = json.values;
	const lists = rows.reduce((acc, [listName, listItem]) => {
		(acc[listName] = acc[listName] || []).push(listItem);
		return acc;
	}, {});

	return {
		pageTitle: `${pageTitle} | 각종 목록들`,
		lists
	};
};
