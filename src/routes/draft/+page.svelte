<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	// TODO: why does the last deleted post not included here?
</script>

<svelte:head>
	<title>{data.pageTitle}</title>
</svelte:head>

<div>
	{#each data.posts as post}
		<div>{post.title}</div>
	{/each}
</div>
