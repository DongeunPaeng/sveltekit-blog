<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import { onMount } from 'svelte';
	import katex from 'katex';
	import hljs from 'highlight.js';
	import { goto } from '$app/navigation';
	import { setAttributeForAll } from '$lib/common';
	import { page } from '\$app/stores';
	import { POST_STATUS, POST_TYPE } from '$lib/types.js';
	import { textEditorConfig } from '$lib/components/textEditorConfig';
	import { recoverOriginalTags } from '$lib/utils/domManipulation';
	import {
		removeQuillUIElements,
		setEditorContentEditable,
		formatLists,
		formatCodeBlocks
	} from '$lib/utils/domManipulation';

	export let draft;
	export let newPost = true;

	const id = draft?.id;
	const verifiedUser = $page.data.verifiedUser;

	let { title, post: content, type, status } = draft || {};
	let editor: HTMLElement;
	let errorMessage: string;

	onMount(async () => {
		window.katex = katex;
		const { default: Quill } = await import('quill');
		const quill = new Quill(editor, {
			modules: {
				syntax: { hljs },
				toolbar: textEditorConfig
			},
			theme: 'snow'
		});
		quill.root.innerHTML = recoverOriginalTags(content);
	});

	const submitForm = async (action: string, data: FormData) => {
		const response = await fetch(action, {
			method: 'POST',
			body: data
		});
		return deserialize(await response.text());
	};

	const handleSubmissionResult = (result: any) => {
		if (result.type === 'redirect') goto(result.location);
		if (result.type === 'failure') {
			setAttributeForAll(document.getElementsByClassName('ql-editor'), 'contenteditable', 'true');
			errorMessage = result?.data?.message as string;
			alert(errorMessage);
		}
		applyAction(result);
	};

	const handleSubmit = async (event: { currentTarget: EventTarget & HTMLFormElement }) => {
		const data = new FormData(event.currentTarget);
		removeQuillUIElements();
		setEditorContentEditable(false);
		formatLists();
		formatCodeBlocks();
		data.append('content', document.querySelector('.ql-editor')?.innerHTML || '');
		const result = await submitForm(event.currentTarget.action, data);
		handleSubmissionResult(result);
	};
</script>

<div class="flex items-start justify-center py-12">
	<div class="w-full">
		<form action={newPost ? "write?/write" : "/write?/edit"} on:submit|preventDefault={handleSubmit}>
			<div class="text-sm text-gray-500 mb-1">Title</div>
			<input type="number" id="postId" name="postId" class="hidden" value={newPost ? null : id}>
			<input type="number" id="authorId" name="authorId" class="hidden" value={verifiedUser.sub}>
			<input
				id="title"
				class="focus:outline-none caret-black mb-4 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900"
				type="text"
				name="title"
				bind:value="{title}"
			/>
			<div class="text-sm text-gray-500 mb-1">Post</div>
			<div class="h-screen mb-28 sm:mb-14">
				<div id="content" class="caret-black" bind:this={editor} />
			</div>

			<div class="flex justify-end items-center">
				<select
					class="py-2 mr-4 text-sm text-gray-900"
					name="type"
					id="type"
				>
					<option value="GENERAL" selected={type === POST_TYPE.GENERAL}>일반</option>
					<option value="STUDY" selected={type === POST_TYPE.STUDY}>공부</option>
					<option value="BOOK_REVIEW" selected={type === POST_TYPE.BOOK_REVIEW}>독서</option>
					<option value="PHOTO" selected={type === POST_TYPE.PHOTO}>사진</option>
				</select>
				<select
					class="py-2 mr-4 text-sm text-gray-900"
					name="status"
					id="status"
				>
					<option value="PUBLIC" selected={status === POST_STATUS.PUBLIC}>Public</option>
					<option value="PRIVATE" selected={status === POST_STATUS.PRIVATE}>Private</option>
				</select>
				<button
					class="bg-gray-200 text-sm text-gray-900 py-2 px-3 rounded-md"
					type="submit"
				>
					Submit
				</button>
			</div>
			{#if errorMessage !== undefined}
				<div class="mt-2 flex justify-end">
					<span class="text-red-500">{errorMessage}</span></div>
			{/if}
		</form>
	</div>
</div>

<style>
    @import 'katex/dist/katex.min.css';
    @import 'quill/dist/quill.snow.css';
    @import 'TextEditor.css';
    @import 'highlight.js/styles/atom-one-dark.min.css';

    :global(.ql-ui) {
        color: black;
    }
</style>
