<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.pageTitle}</title>
</svelte:head>

<div>
	<ul class="my-4 ml-4 px-2 list-disc list-outside">
		{#if !data.books || data.books.length === 0}
			책을 불러오지 못했어요
		{:else}
			{#each data.books as book}
				<li
					class="my-2 text-sm text-gray-600"
				>
					<span class="text-gray-400">[{book["완료연도"]}]</span> <span>{book["책 제목"]}</span> <span
					class="text-gray-400">({book["내 평점"]}점)</span>
				</li>
			{/each}
		{/if}
	</ul>
</div>