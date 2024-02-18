<script lang="ts">
	import type { LayoutServerData } from './$types';
	import '../app.css';
	export let data: LayoutServerData;
</script>

<svelte:head>
	<title>{data.pageTitle}</title>
</svelte:head>

<div>
	<a href="/"><strong>Dongeun Paeng</strong></a>
	<a href="/draft">Draft</a>
	<a href="/write">Write</a>
</div>

<slot />
