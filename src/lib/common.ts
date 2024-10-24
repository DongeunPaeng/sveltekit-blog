import { DateTime, Interval } from 'luxon';
import { parse } from 'node-html-parser';
import type { Post } from '$lib/types';

export const addAge = (createdAt: Date): string => {
	const birthDate: DateTime = DateTime.local(1989, 12, 23, 0, 0, 0);
	const writtenDate: DateTime = DateTime.fromJSDate(createdAt);
	const interval = Interval.fromDateTimes(birthDate, writtenDate);
	const age: number = Math.floor(interval.length('years'));
	return writtenDate.toFormat('LLL dd, yyyy') + ` · 만 ${age}세`;
};

const getPreview = (post: Post): string => {
	const doc = parse('' + post.post);
	return doc.getElementsByTagName('p')[0]?.rawText?.slice(0, 80) ?? '...';
};

export const addPreview = (post: Post): Post & {
	preview: string
} => ({ preview: getPreview(post), ...post });

export const setAttributeForAll = (elements: HTMLCollectionOf<Element>, attribute: string, value: string): void =>
	Array.from(elements).forEach(el => el.setAttribute(attribute, value));

export const checkEmptyPost = (content: string): boolean => content
	.replaceAll(' ', '')
	.replaceAll('<p></p>', '')
	.replaceAll('<p><br></p>', '') === '';

export const applyReplacements = (content: string, replacements: Array<Array<string>>): string =>
	replacements.length === 0
		? content
		: applyReplacements(content.replaceAll(replacements[0][0], replacements[0][1]), replacements.slice(1));