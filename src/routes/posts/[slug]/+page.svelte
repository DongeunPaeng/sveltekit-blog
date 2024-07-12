<script lang="ts">
	import type { PageData } from './$types';
	import 'katex/dist/katex.min.css';
	import { DateTime, Interval } from 'luxon';

	export let data: PageData;

	const addAge = (createdAt: Date): string => {
		const birthDate: DateTime = DateTime.local(1989, 12, 23, 0, 0, 0);
		const writtenDate: DateTime = DateTime.fromJSDate(createdAt);
		const interval = Interval.fromDateTimes(birthDate, writtenDate);
		const age: number = Math.floor(interval.length('years'));
		return writtenDate.toFormat('LLL dd, yyyy') + ` · 만 ${age}세`;
	};
</script>

<svelte:head>
	<title>{data.pageTitle}</title>
</svelte:head>

<div class="flex justify-between items-center w-full my-4">
	<div class="mt-12 w-full pb-6">
		<div class="flex justify-between">
			<div>
				<h1 class="text-xl text-gray-800">{data.post.title}</h1>
				<div class="text-sm text-gray-400">
					by dongeun.paeng@gmail.com
				</div>
				<div class="mb-10 text-sm text-gray-400">
					{addAge(data.post.created_at)}
				</div>
			</div>
			<div class="flex flex-col items-end ml-4 mb-2 text-sm text-gray-400">
				<!--TODO: finish this edit and delete function-->
				<a class="text-gray-400" href={`/edit/${data.post.id}`}>
					EDIT
				</a>
				<button on:click={()=>{}}>DELETE</button>
			</div>
		</div>
		<div class="renderedHTML mb-4 text-base text-gray-600">
			{@html data.post.post}
		</div>
	</div>
</div>

<style>
</style>
