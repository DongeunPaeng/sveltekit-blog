<script lang="ts">
	import type { LayoutServerData } from './$types';
	import '../app.css';
	import { page } from '\$app/stores';

	const enum POST_TYPE {
		GENERAL,
		STUDY,
		BOOK_REVIEW,
		PHOTO
	}

	export let data: LayoutServerData;
	const pages = [
		{
			name: '책장',
			href: '/bookshelf'
		},
		{
			name: '발췌',
			href: '/excerpts'
		},
		{
			name: '각종 목록들',
			href: '/lists'
		}
	];

	const scrollToBottom = () => {
		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: 'smooth'
		});
	};

	$: type = $page.url.pathname === '/' && parseInt($page.url.searchParams.get('type') ?? '0');
</script>

<svelte:head>
	<title>{data.pageTitle}</title>
</svelte:head>

<div id="container" class="flex flex-col items-center mt-6 horizontal-limit">
	<div id="top_nav" class="w-full">
		<a class="font-extrabold" href="/">Dongeun Paeng</a>
		<div id="menu" class="mt-4 py-2 items-center sm:flex sm:justify-between">
			<div class="flex space-x-4">
				{#if data.loggedInUser}
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

			{#if data.loggedInUser}
				<form method="POST" action="/auth?/logout">
					<div class="flex space-x-4">
						<a class="menu" href="/write">글쓰기</a>
						<button class="menu">나가기</button>
					</div>
				</form>
			{/if}
		</div>
	</div>
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
				<li>
					<a
						href="https://github.com/DongeunPaeng"
						class="footer-links hover:underline hover:text-blue-800"
						rel="noreferrer"
						target="_blank"
					>
						자기소개
					</a>
				</li>
			</ul>
			<button on:click={scrollToBottom}>
				↓
			</button>
		</div>
	</div>
</div>
