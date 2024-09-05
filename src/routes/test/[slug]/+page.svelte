<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let readonly = true;
	let value = data.content.content;

	const toggleReadonly = () => readonly = !readonly;
</script>

<svelte:head>
	<title>TEST</title>
</svelte:head>

<div class="flex flex-col w-1/2 space-y-5 my-4">
	<textarea class={readonly ? 'editing' : ''} name="content" id="content" cols="30" rows="10" bind:value={value}
						readonly={readonly} />
	{#if readonly}
		<button class="bg-amber-300 p-2" on:click={toggleReadonly}>Edit</button>
	{/if}
	{#if !readonly}
		<form class="bg-amber-300 p-2" method="post" action="?/edit">
			<input type="text" class="hidden" name="content" value={value}>
			<input type="number" class="hidden" name="id" value={data.content.id}>
			<button class="w-full">Save</button>
		</form>
	{/if}
</div>

<style>
    .editing {
        border: none;
        overflow: auto;
        outline: none;

        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;

        resize: none; /*remove the resize handle on the bottom right*/
    }
</style>
