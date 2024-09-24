<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import { onMount } from 'svelte';
	import katex from 'katex';
	import hljs from 'highlight.js';
	import { goto } from '$app/navigation';
	import { setAttributeForAll } from '$lib/common';

	export let draft: Post | null;
	export let title = draft?.title;
	export let content = draft?.post;
	export let id = draft?.id;
	export let newPost = true;

	let editor: HTMLElement;
	let errorMessage: string;

	export let toolbarOptions = [
		[{ header: [1, 2, false] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
		[
			{ list: 'ordered' },
			{ list: 'bullet' },
			{ indent: '-1' },
			{ indent: '+1' }
		],
		['link', 'image', 'formula'],
		[{ align: [] }, { color: [] }, { background: [] }],
		['clean']
	];

	onMount(async () => {
		window.katex = katex;
		const { default: Quill } = await import('quill');

		const quill = new Quill(editor, {
			modules: {
				syntax: { hljs },
				toolbar: toolbarOptions
			},
			theme: 'snow'
		});
		quill.root.innerHTML = content
			?.replaceAll(`<ul`, `<ol`)
			.replaceAll(`ul>`, `ol>`)
			.replaceAll(`<pre`, `<div`)
			.replaceAll(`pre>`, `div>`) || '';
	});

	const removeElementsByClass = (className: string) => {
		const elements = document.getElementsByClassName(className);
		while (elements.length > 0) {
			elements[0].parentNode?.removeChild(elements[0]);
		}
	};

	const replaceCodeBlock = (block: Element) => {
		const language = block.querySelector('.ql-code-block')?.getAttribute('data-language');
		block.outerHTML = `<div class="ql-code-block-container"><pre class="ql-code-block"><code class="language-${language}">${block.innerText}</code></pre></div>`;
	};

	const convertOlToUl = (block: Element) => {
		if (!!block.querySelector('[data-list="bullet"]')) {
			const ul = document.createElement('ul');
			ul.innerHTML = block.innerHTML;
			block.insertAdjacentElement('afterend', ul);
			block.remove();
		}
	};

	const addClass = (block: Element, classNames: string[]) => block.classList.add(...classNames);

	const onSubmit = async (e: SubmitEvent) => {
		const data = new FormData(e.currentTarget as HTMLFormElement);

		['ql-ui', 'ql-tooltip'].forEach(removeElementsByClass);
		setAttributeForAll(document.getElementsByClassName('ql-editor'), 'contenteditable', 'false');
		document.querySelectorAll('ol').forEach(convertOlToUl);
		document.querySelectorAll('ol').forEach(el => addClass(el, ['list-decimal', 'list-inside']));
		document.querySelectorAll('ul').forEach(el => addClass(el, ['list-disc', 'list-inside']));
		document.querySelectorAll('.ql-code-block-container').forEach(replaceCodeBlock);

		data.append('content', document.querySelector('.ql-editor')?.innerHTML || '');

		const response = await fetch(e.currentTarget?.action, {
			method: 'POST',
			body: data
		});
		const result = deserialize(await response.text());

		if (result.type === 'redirect') goto(result.location);
		if (result.type === 'failure') {
			setAttributeForAll(document.getElementsByClassName('ql-editor'), 'contenteditable', 'true');
			errorMessage = result?.data?.message as string;
			alert(errorMessage);
		}
		applyAction(result);
	};
</script>

<div class="flex items-start justify-center py-12">
	<div class="w-full">
		<form action={newPost ? "write?/write" : "/write?/edit"} on:submit|preventDefault={onSubmit}>
			<div class="text-sm text-gray-500 mb-1">Title</div>
			<input type="number" id="postId" name="postId" class="hidden" value={newPost ? null : id}>
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
					<option value="GENERAL">일반</option>
					<option value="STUDY">공부</option>
					<option value="BOOK_REVIEW">독서</option>
					<option value="PHOTO">사진</option>
				</select>
				<select
					class="py-2 mr-4 text-sm text-gray-900"
					name="status"
					id="status"
				>
					<option value="PUBLIC">Public</option>
					<option value="PRIVATE">Private</option>
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