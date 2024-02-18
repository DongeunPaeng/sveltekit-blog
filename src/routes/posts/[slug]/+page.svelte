<script lang="ts">
	import type { PageData } from './$types';
	import 'katex/dist/katex.min.css';
	import { DateTime, Interval } from 'luxon';
	export let data: PageData;

	const addAge = (createdAt: Date): string => {
		const birthDate: DateTime = DateTime.local(1989, 12, 23, 0, 0, 0);
		const writtenDate: DateTime = DateTime.fromJSDate(createdAt);
		const interval = Interval.fromDateTimes(birthDate, writtenDate);
		const age: number = Math.floor(interval.length('years'));
		return writtenDate.toFormat('LLL dd, yyyy') + ` · 만 ${age}세`;
	};
</script>

<svelte:head>
	<title>{data.pageTitle}</title>
</svelte:head>

<div>
	{data.post.title}
</div>
<div>
	{addAge(data.post.created_at)}
</div>
<div>
	{@html data.post.post}
</div>

<style>
</style>
