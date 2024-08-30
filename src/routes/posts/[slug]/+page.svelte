<script lang="ts">
	import type { PageData } from './$types';
	import 'katex/dist/katex.min.css';
	import { DateTime, Interval } from 'luxon';
	import type { ActionResult } from '@sveltejs/kit';
	import { applyAction, deserialize } from '$app/forms';
	import { goto } from '\$app/navigation';
	import hljs from 'highlight.js';
	import { onMount } from 'svelte';

	onMount(() => {
		hljs.highlightAll();
	});

	export let data: PageData;

	const addAge = (createdAt: Date): string => {
		const birthDate: DateTime = DateTime.local(1989, 12, 23, 0, 0, 0);
		const writtenDate: DateTime = DateTime.fromJSDate(createdAt);
		const interval = Interval.fromDateTimes(birthDate, writtenDate);
		const age: number = Math.floor(interval.length('years'));
		return writtenDate.toFormat('LLL dd, yyyy') + ` · 만 ${age}세`;
	};

	const deletePost = async (event: { currentTarget: EventTarget & HTMLFormElement }) => {
		const isConfirmed = window.confirm('Are you sure to delete this post?');
		if (!isConfirmed) return;
		const formData = new FormData(event.currentTarget);
		formData.append('postId', data.post.id as unknown as string);
		formData.append('authorId', data.post.author as unknown as string);
		formData.append('loggedInUserId', '' + data?.loggedInUser?.sub);
		const response = await fetch(event.currentTarget.action + '?/delete', {
			method: 'POST',
			body: formData
		});
		const result: ActionResult = deserialize(await response.text());
		if (result.type === 'success') {
			data.posts = data.posts.filter((p) => p.id !== data.post.id);
			// await invalidateAll();
			goto('/');
		} else {
			alert('삭제 실패: ' + result.data.message);
		}
		applyAction(result);
	};
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
					by dongeun.paeng@gmail.com
				</div>
				<div class="mb-10 text-sm text-gray-400">
					{addAge(data.post.created_at)}
				</div>
			</div>
			<div class="flex flex-col items-end ml-4 mb-2 text-sm text-gray-400">
				<a class="text-gray-400" href="/edit">
					EDIT
				</a>
				<form method="POST" on:submit|preventDefault={deletePost}>
					<button class="text-gray-400">
						DELETE
					</button>
				</form>
			</div>
		</div>
		<div class="renderedHTML mb-4 text-base text-gray-600">
			{@html data.post.post}
		</div>

		<!--TODO: finish here-->
		<div id="recommended_post" class="mt-10 px-4">
			<p class="text-gray-400 text-sm py-1 border-gray-200 border-0 border-t">
				NEXT POST
			</p>
			<div class="w-full my-4">
				<a href='/' class="text-gray-800">
					<h1>TITLE</h1>
				</a>
				<div class="mb-2 text-sm text-gray-400">
					DATE
				</div>
				<p class="text-sm text-gray-600">
					PARA
					<a
						href='/'
						class="ml-2 text-sm text-gray-400 hover:text-gray-800 underline"
					>
						더 보기
					</a>
				</p>
			</div>
		</div>
	</div>
</div>

<style>
    @import "highlight.js/styles/atom-one-light.min.css";
</style>
