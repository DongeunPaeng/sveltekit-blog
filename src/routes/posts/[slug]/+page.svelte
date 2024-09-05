<script lang="ts">
	import type { PageData } from './$types';
	import 'katex/dist/katex.min.css';
	import hljs from 'highlight.js';
	import { onMount } from 'svelte';
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { addAge } from '$lib/common';

	export let data: PageData;

	onMount(() => {
		hljs.highlightAll();
	});
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
			<div class="flex flex-col items-end ml-4 mb-2 text-sm text-gray-400">
				<a class="text-gray-400" href={`/draft/${data.post.id}`}>
					EDIT
				</a>
				<form method="POST" action="?/delete" use:enhance={() => {
					if (confirm("정말 지우실 거예요?")) {
  					return async ({ result }) => result.type === 'redirect'
  						? goto(result.location)
  						: applyAction(result);
					}
				}}>
					<input class="hidden" type="number" name="postId" value={data.post.id} />
					<input class="hidden" type="number" name="authorId" value={data.post.author} />
					<input class="hidden" type="number" name="loggedInUserId" value={data?.loggedInUser?.sub} />
					<button class="text-gray-400">
						DELETE
					</button>
				</form>
			</div>
		</div>
		<!-- FIXME: 원래 여기 클래스로 renderHTML이 있었다. -->
		<div class="mb-4 text-base text-gray-600">
			{@html data.post.post}
		</div>

		{#if data.nextPost || data.previousPost}
			{#each [
				{ post: data.nextPost, label: 'NEXT POST' },
				{ post: data.previousPost, label: 'PREVIOUS POST' }
			] as { post, label }}
				{#if post}
					<div id="recommended_post" class="mt-10 px-4">
						<p class="text-gray-400 text-sm py-1 border-gray-200 border-0 border-t">
							{label}
						</p>
						<div class="w-full my-4">
							<a href={`/posts/${post.id}`} class="text-gray-800">
								<h1>{post.title}</h1>
							</a>
							<div class="mb-2 text-sm text-gray-400">
								{post.created_at}
							</div>
							<p class="text-sm text-gray-600">
								{post.title}
								<a href={`/post/${post.id}`} class="ml-2 text-sm text-gray-400 hover:text-gray-800 underline">
									더 보기
								</a>
							</p>
						</div>
					</div>
				{/if}
			{/each}
		{/if}
	</div>
</div>

<style>
    @import "highlight.js/styles/atom-one-light.min.css";
</style>
