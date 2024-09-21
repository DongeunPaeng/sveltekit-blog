<script lang="ts">
	import type { LayoutServerData } from './$types';
	import '../app.css';

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
</script>

<svelte:head>
	<title>{data.pageTitle}</title>
</svelte:head>

<div id="container" class="flex flex-col items-center mt-6 horizontal-limit">
	<div id="top_nav" class="w-full">
		<a class="font-extrabold" href="/">Dongeun Paeng</a>
		<div id="menu" class="mt-4 items-center sm:flex sm:justify-between">
			{#if data.loggedInUser}
				<a class="text-gray-400 py-2 menu" href="/draft">Draft</a>
				<form method="POST" action="/auth?/logout">
					<div class="py-2">
						<a class="mr-4 menu" href="/write">Write</a>
						<button class="menu">Logout</button>
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
