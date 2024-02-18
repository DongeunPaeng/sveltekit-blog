<script lang="ts">
	import type { PageData } from './$types';
	import { DateTime, Interval } from 'luxon';
	export let data: PageData;

	// TODO: first paragraph feature unfinished
	const getFirstSome = (post: string) => {
		return '첫 번째 문장에서 일부 글자를 80개까지 읽어오는 기능 만들어야 합니다.';
		// const parser = new DOMParser();
		// const doc = parser.parseFromString(post, 'text/html');
		// return doc.getElementsByTagName('p')[0].innerText?.slice(0, 80) ?? '';
	};

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
		class="mt-8 mb-4 md:w-1/2 w-full p-2 border border-gray-300 rounded-md"
		type="text"
		placeholder="Search"
		name=""
		id=""
	/>
	{#each data.posts as post}
		<div id="post_card" class="my-4">
			<div id="post_title" class="text-gray-800">
				<a href={`/posts/${post.id}`}>{post.title}</a>
			</div>
			<div id="post_date" class="text-gray-400 text-sm mb-2">
				{addAge(post.created_at)}
			</div>
			<div id="post_preview" class="text-sm text-gray-600">
				{getFirstSome(post.post)}
			</div>
		</div>
	{/each}
</div>
