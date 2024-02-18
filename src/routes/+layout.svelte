<script lang="ts">
	import type { LayoutServerData } from './$types';
	import '../app.css';
	export let data: LayoutServerData;
</script>

<svelte:head>
	<title>{data.pageTitle}</title>
</svelte:head>

<div id="container" class="flex flex-col items-center max-w-5xl mx-auto mt-6 px-8">
	<div id="top_nav" class="w-full">
		<a class="font-bold" href="/">Dongeun Paeng</a>
		<a href="/draft">Draft</a>
		<a href="/write">Write</a>
	</div>
	<div id="slot" class="w-full">
		<slot />
	</div>
</div>
