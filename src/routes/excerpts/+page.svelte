<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.pageTitle}</title>
</svelte:head>

<div>
	{#if data.verifiedUser}
		<form method="post" action="?/create" class="flex space-x-2">
			<textarea placeholder="내용 입력하세요." class="border-2 p-2" name="content" id="content" cols="50" rows="5" />
			<button type="submit">✅</button>
		</form>
	{/if}
	<ul class="my-4 ml-4 px-2 list-disc list-outside">
		{#each data.excerpts as excerpt}
			<li
				class="my-2 text-sm text-gray-600"
			>
				<div class="flex space-x-2 items-center">
					{#if data.verifiedUser}
						<a class="hover:underline hover:text-blue-800" href={`/excerpts/${excerpt.id}`}>{excerpt.content}</a>
						<form method="post" action="?/delete" use:enhance={({cancel}) => {
							if(confirm("진짜?")) {
								return async ({ update }) => update()
							} else {
								cancel()
							}
						}}>
							<input class="hidden" type="number" name="id" value={excerpt.id} />
							<button class="text-red-500">⌫</button>
						</form>
					{:else}
						<span>{excerpt.content}</span>
					{/if}
				</div>
			</li>
		{/each}
	</ul>
</div>

<style>
</style>
