<script lang="ts">
	import type { LayoutServerData } from './$types';
	import '../app.css';
	import { page } from '\$app/stores';
	import { POST_TYPE, type Page } from '$lib/types';
	import { navigating } from '$app/stores';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

	export let data: LayoutServerData;

	const createPages = (...pageEntries: [string, string][]): Array<Page> =>
		pageEntries.map(([name, href]) => ({ name, href }));

	const pages = createPages(
		['책장', '/bookshelf'],
		['교훈', '/excerpts'],
		['각종 목록들', '/lists'],
		['자기소개', '/profile']
	);

	const scrollToBottom = () => {
		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: 'smooth'
		});
	};

	$: type = $page.url.pathname === '/' && parseInt($page.url.searchParams.get('type') ?? '' + POST_TYPE.GENERAL);
</script>

<svelte:head>
	<title>{data.pageTitle}</title>
</svelte:head>

<div id="container" class="flex flex-col items-center mt-6 horizontal-limit">
	<div id="top_nav" class="w-full">
		<a class="font-extrabold" href="/">Dongeun Paeng</a>
		<div id="menu" class="mt-4 py-2 items-center sm:flex sm:justify-between">
			<div class="flex space-x-4">
				{#if data.verifiedUser}
					<a class="text-gray-400 my-auto menu" href="/draft">임시</a>
				{/if}
				<a
					class="my-auto menu"
					href={`/?type=${POST_TYPE.GENERAL}`}><span
					class={`${type === POST_TYPE.GENERAL && 'font-bold'}`}>일반</span></a>
				<a class="my-auto menu"
					 href={`/?type=${POST_TYPE.STUDY}`}><span
					class={`${type === POST_TYPE.STUDY && 'font-bold'}`}>공부</span></a>
				<a class="my-auto menu"
					 href={`/?type=${POST_TYPE.BOOK_REVIEW}`}><span
					class={`${type === POST_TYPE.BOOK_REVIEW && 'font-bold'}`}>독서</span></a>
				<a class="my-auto menu"
					 href={`/?type=${POST_TYPE.PHOTO}`}><span
					class={`${type === POST_TYPE.PHOTO && 'font-bold'}`}>사진</span></a>
			</div>

			{#if data.verifiedUser}
				<form method="POST" action="/auth?/logout">
					<div class="flex space-x-4">
						<a class="menu" href="/write">글쓰기</a>
						<button class="menu">나가기</button>
					</div>
				</form>
			{/if}
		</div>
	</div>
	{#if $navigating}
		<div>
			<LoadingSpinner />
		</div>
	{/if}
	<div id="slot" class="w-full pb-14">
		<slot />
	</div>
	<div class="fixed bottom-0 w-full py-2 bg-white border-t border-gray-800">
		<div class="horizontal-limit flex justify-between items-center">
			<ul class="flex space-x-3 items-center">
				{#each pages as page}
					<li>
						<a href={page.href} class="footer-links hover:underline hover:text-blue-800">
							{page.name}
						</a>
					</li>
				{/each}
			</ul>
			<button on:click={scrollToBottom}>
				↓
			</button>
		</div>
	</div>
</div>
