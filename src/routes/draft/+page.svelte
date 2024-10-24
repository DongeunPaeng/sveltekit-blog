<script lang="ts">
	import type { PageData } from './$types';
	import { addAge } from '$lib/common';

	export let data: PageData;

	let searchKeyword: string = '';
	$: filteredPost = data.posts.filter(post =>
		post.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
		post.post.toLowerCase().includes(searchKeyword.toLowerCase())
	);
</script>

<svelte:head>
	<title>{data.pageTitle}</title>
</svelte:head>

<div>
	<input
		class="mt-4 mb-4 md:w-1/2 w-full p-2 border border-gray-300 rounded-md"
		type="text"
		placeholder="Search"
		bind:value={searchKeyword}
	/>
	{#each filteredPost as post}
		<div id="post_card" class="my-4">
			<div id="post_title">
				<a href={`/draft/${post.id}`}>{post.title}</a>
			</div>
			<div id="post_date" class="text-gray-400 text-sm mb-2">
				{addAge(post.created_at)}
			</div>
			<div id="post_preview" class="text-sm text-gray-600">
				{@html post.preview}
				<a href={`/draft/${post.id}`} class="ml-1 text-sm text-gray-400 hover:text-gray-800 underline">더 보기</a>
			</div>
		</div>
	{/each}
</div>
