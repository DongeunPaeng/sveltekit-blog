<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let value = '내용을 입력하세요.';
</script>

<svelte:head>
	<title>TEST</title>
</svelte:head>

<div class="flex flex-col w-1/2 space-y-5 my-4">
	{#each data.contents as datum}
		<div class="flex space-x-2 items-center">
			<p><span>{datum.id}</span>. {datum.content}</p>
			<a class="bg-amber-300 p-2" href={`/test/${datum.id}`}>Go to Edit</a>
			<form method="post" action="?/delete">
				<input class="hidden" type="number" name="id" value={datum.id} />
				<button class="bg-amber-300 p-2">Delete</button>
			</form>
		</div>
	{/each}
	<form method="post" action="?/create" class="flex flex-col">
		<textarea class="border-2 p-2" name="content" id="content" cols="30" rows="10" bind:value={value}></textarea>
		<button class="bg-amber-300 p-2 mt-2" type="submit">Save</button>
	</form>
</div>

<style>
</style>
