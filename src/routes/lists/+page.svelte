<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let listShown: Array<string> = [];
</script>

<svelte:head>
	<title>{data.pageTitle}</title>
</svelte:head>

<div>
	{#each Object.keys(data.lists) as listName}
		<div class="mt-4 text-sm font-semibold">
			{listName}
			<button class="ml-1 text-sm text-gray-400 hover:text-gray-800 underline"
							on:click={() => listShown = listShown.includes(listName)
					? listShown.filter(list => list !== listName)
					: [...listShown, listName]}>
				{#if listShown.includes(listName)}닫기{:else}펼치기{/if}
			</button>
		</div>
		{#if listShown.includes(listName)}
			<ul class="my-4 ml-4 px-2 list-disc list-outside">
				{#each data.lists[listName] as listItem}
					<li class="my-2 text-sm text-gray-600">{listItem}</li>
				{/each}
			</ul>
		{/if}
	{/each}
</div>