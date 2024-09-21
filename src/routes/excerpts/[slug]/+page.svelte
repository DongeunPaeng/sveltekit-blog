<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let readonly = true;
	let value = data.content.content;

	const toggleReadonly = () => readonly = !readonly;
</script>

<svelte:head>
	<title>{data.pageTitle}</title>
</svelte:head>

<div class="flex space-x-2">
	<textarea class={`border-2 p-2 ${readonly ? 'readonly' : ''}`} name="content" id="content" cols="50" rows="10"
						bind:value={value}
						readonly={readonly} />
	{#if readonly}
		<button on:click={toggleReadonly}>✏️</button>
	{/if}
	{#if !readonly}
		<form method="post" action="?/edit">
			<input type="text" class="hidden" name="content" value={value}>
			<input type="number" class="hidden" name="id" value={data.content.id}>
			<button>✅</button>
		</form>
	{/if}
</div>

<style>
    .readonly {
        overflow: auto;
        outline: none;

        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;

        resize: none; /*remove the resize handle on the bottom right*/
    }
</style>
