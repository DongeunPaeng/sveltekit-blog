<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>{data.pageTitle}</title>
</svelte:head>

<div>
	{#each data.posts as post}
		<div>{post.title}</div>
	{/each}
</div>
