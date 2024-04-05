<script lang="ts">
	import type { LayoutServerData } from './$types';
	import '../app.css';
	export let data: LayoutServerData;
</script>

<svelte:head>
	<title>{data.pageTitle}</title>
</svelte:head>

<div id="container" class="flex flex-col items-center max-w-5xl mx-auto mt-6 px-6 lg:px-8">
	<div id="top_nav" class="w-full">
		<a class="font-extrabold" href="/">Dongeun Paeng</a>
		<div id="menu" class="mt-4 items-center sm:flex sm:justify-between">
			{#if true}
				<a class="text-gray-400 py-2 menu" href="/draft">Draft</a>
			{:else}
				<div />
			{/if}
			<div class="py-2">
				<a class="mr-4 menu" href="/write">Write</a>
				<a class="menu" href="/write">Logout</a>
			</div>
		</div>
	</div>
	<div id="slot" class="w-full">
		<slot />
	</div>
</div>
