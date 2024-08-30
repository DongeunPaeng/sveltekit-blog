<script lang="ts">
	import { page } from '\$app/stores';

	console.log($page.params);
</script>

<svelte:head>
	<title>TEST</title>
</svelte:head>

<div class="flex flex-col w-1/2 space-y-5 my-4">
	{$page.params.slug}
</div>

<style>
</style>
