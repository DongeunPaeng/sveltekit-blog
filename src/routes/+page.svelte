<script lang="ts">
	import type { PageData } from './$types';
	import { addAge } from '$lib/common';
	import { page } from '\$app/stores';
	import { POST_TYPE } from '$lib/types';

	export let data: PageData;

	let searchKeyword: string = '';
	$: type = parseInt($page.url.searchParams.get('type') ?? '' + POST_TYPE.GENERAL);

	$: filteredPost = data.posts.filter(post =>
		(post.type === type) &&
		(post.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
			post.post.toLowerCase().includes(searchKeyword.toLowerCase()))
	);

</script>

<svelte:head>
	<title>{data.pageTitle}</title>
</svelte:head>

<div>
	<!-- TODO: 문법 검사해보기 -->
	{#if type !== POST_TYPE.PHOTO}
		<input
			class="mt-4 mb-4 md:w-1/2 w-full p-2 border border-gray-300 rounded-md"
			type="text"
			placeholder="Search"
			bind:value={searchKeyword}
		/>
	{/if}
	{#each filteredPost as post}
		{#if type !== POST_TYPE.PHOTO}
			<div id="post_card" class="my-4">
				<div id="post_title">
					<a href={`/posts/${post.id}`}>{post.title}</a>
				</div>
				<div id="post_date" class="text-gray-400 text-sm mb-2">
					{addAge(post.created_at)}
				</div>
				<div id="post_preview" class="text-sm text-gray-600">
					{@html post.preview}
					<a href={`/posts/${post.id}`} class="ml-1 text-sm text-gray-400 hover:text-gray-800 underline">더 보기</a>
				</div>
			</div>
		{:else}
			<div id="post_card" class="my-4">
				{@html post.post}
				<div id="post_date" class="text-gray-400 text-sm mb-2">
					{post.title}
				</div>
			</div>
		{/if}
	{/each}
</div>
