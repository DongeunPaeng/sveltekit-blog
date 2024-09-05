import { DateTime, Interval } from 'luxon';
import { parse } from 'node-html-parser';

export const addAge = (createdAt: Date): string => {
	const birthDate: DateTime = DateTime.local(1989, 12, 23, 0, 0, 0);
	const writtenDate: DateTime = DateTime.fromJSDate(createdAt);
	const interval = Interval.fromDateTimes(birthDate, writtenDate);
	const age: number = Math.floor(interval.length('years'));
	return writtenDate.toFormat('LLL dd, yyyy') + ` · 만 ${age}세`;
};

const getPreview = (post: Post) => {
	const doc = parse('' + post.post);
	return doc.getElementsByTagName('p')[0]?.rawText?.slice(0, 80) ?? '...';
};

export const addPreview = (post: Post): Post => ({ preview: getPreview(post), ...post });

export const setAttributeForAll = (elements: HTMLCollectionOf<Element>, attribute: string, value: string) =>
	Array.from(elements).forEach(el => el.setAttribute(attribute, value));