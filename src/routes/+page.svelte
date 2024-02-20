<script lang="ts">
	import type { PageData } from './$types';
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
	<!-- TODO: search feature unfinished -->
	<input
		class="mt-4 mb-4 md:w-1/2 w-full p-2 border border-gray-300 rounded-md"
		type="text"
		placeholder="Search"
		name=""
		id=""
	/>
	{#each data.posts as post}
		<div id="post_card" class="my-4">
			<div id="post_title">
				<a href={`/posts/${post.id}`}>{post.title}</a>
			</div>
			<div id="post_date" class="text-gray-400 text-sm mb-2">
				{addAge(post.created_at)}
			</div>
			<div id="post_preview" class="text-sm text-gray-600">
				{post.preview}
			</div>
		</div>
	{/each}
</div>
