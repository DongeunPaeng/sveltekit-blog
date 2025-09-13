<script lang="ts">
	import type { PageData } from './$types';
	import 'katex/dist/katex.min.css';
	import hljs from 'highlight.js';
	import { onMount } from 'svelte';
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { addAge } from '$lib/common';
	import type { Post } from '$lib/types';

	export let data: PageData;

	onMount(() => {
		hljs.highlightAll();
	});

	const adjacentPosts: ({ post: Post & { preview: string }, label: string })[] = [
		data.nextPost && { post: data.nextPost, label: 'NEXT POST' },
		data.previousPost && { post: data.previousPost, label: 'PREVIOUS POST' }
	].filter(Boolean);
</script>

<svelte:head>
	<title>{data.pageTitle}</title>
</svelte:head>

<div class="flex justify-between items-center w-full my-4">
	<div class="mt-12 w-full pb-6">
		<div class="flex justify-between">
			<div>
				<h1 class="text-xl text-gray-800">{data.post.title}</h1>
				<div class="text-sm text-gray-400">
					by Dongeun Paeng
				</div>
				<div class="mb-10 text-sm text-gray-400">
					{addAge(data.post.created_at)}
				</div>
			</div>
			{#if data.verifiedUser}
				<div class="flex flex-col items-end ml-4 mb-2 text-sm text-gray-400">
					<a class="text-gray-400" href={`/draft/${data.post.id}`}>
						EDIT
					</a>
					<form method="post" action="?/delete" use:enhance={({cancel}) => {
					if (confirm("정말 지우실 거예요?")) {
  					return async ({ result }) => result.type === 'redirect'
  						? goto(result.location)
  						: applyAction(result);
					} else {
						cancel()
					}
				}}>
						<input class="hidden" type="number" name="postId" value={data.post.id} />
						<input class="hidden" type="number" name="authorId" value={data.post.author} />
						<input class="hidden" type="number" name="verifiedUserId" value={data?.verifiedUser?.sub} />
						<button class="text-gray-400">
							DELETE
						</button>
					</form>
				</div>
			{/if}
		</div>
		<div class="mb-4 text-base text-gray-600 leading-[1.8] tracking-tight">
			{@html data.post.post}
		</div>

		{#each adjacentPosts as { post, label }}
			<div id="recommended_post" class="mt-10">
				<p class="text-gray-400 text-sm py-1 border-gray-200 border-0 border-t">
					{label}
				</p>
				<div class="w-full my-4">
					<a data-sveltekit-reload href={`/posts/${post.id}`} class="text-gray-800">
						<h1>{post.title}</h1>
					</a>
					<div class="mb-2 text-sm text-gray-400">
						{addAge(post.created_at)}
					</div>
					<p class="text-sm text-gray-600">
						{@html post.preview}
						<a data-sveltekit-reload href={`/posts/${post.id}`}
							 class="ml-1 text-sm text-gray-400 hover:text-gray-800 underline">
							더 보기
						</a>
					</p>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
    @import "highlight.js/styles/atom-one-light.min.css";
</style>
