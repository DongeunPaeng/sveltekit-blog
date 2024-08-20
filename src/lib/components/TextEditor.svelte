<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';

	export let title = '';
	import { onMount } from 'svelte';
	import katex from 'katex';
	import hljs from 'highlight.js';
	import { goto, invalidateAll } from '$app/navigation';

	let editor: HTMLElement;

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

		new Quill(editor, {
			modules: {
				syntax: { hljs },
				toolbar: toolbarOptions
			},
			theme: 'snow'
		});
	});

	const removeElementsByClass = (className: string) => {
		const elements = document.getElementsByClassName(className);
		while (elements.length > 0) {
			elements[0].parentNode?.removeChild(elements[0]);
		}
	};

	const onSubmit = async (e: SubmitEvent) => {
		const data = new FormData(e.currentTarget as HTMLFormElement);

		removeElementsByClass('ql-ui');
		removeElementsByClass('ql-tooltip');

		// Set editable to false
		const editableContent = document.getElementsByClassName('ql-editor');
		for (let editableContentElement of editableContent) {
			editableContentElement.setAttribute('contenteditable', 'false');
		}

		// Make code block detectable for highlight.js
		const codeBlock = document.getElementsByClassName('ql-code-block-container');
		for (let codeBlockElement of codeBlock) {
			const language = codeBlockElement.getElementsByClassName('ql-code-block')[0].getAttribute('data-language');
			const code = codeBlockElement.innerText;
			codeBlockElement.outerHTML = `<div><pre><code class="language-${language}">${code}</code></pre></div>`;
		}

		data.append('content', editor.innerHTML || '');

		const response = await fetch(e.currentTarget?.action, {
			method: 'POST',
			body: data
		});

		const result = deserialize(await response.text());
		if (result.type === 'success') {
			// TODO: what is invalidateAll?
			await invalidateAll();
			await goto('/');
		}
		// TODO: check if I need the below codes.
		applyAction(result);
	};
</script>

<div class="flex items-start justify-center py-12">
	<div class="w-full">
		<form method="post" action="/write?/write" on:submit|preventDefault={onSubmit}>
			<div class="text-sm text-gray-500 mb-1">Title</div>
			<input
				id="title"
				required
				class="mb-4 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 sm:text-sm"
				type="text"
				name="title"
				bind:value="{title}"
			/>
			<div class="text-sm text-gray-500 mb-1">Post</div>

			<div class="h-screen mb-28 sm:mb-14">
				<div id="content" bind:this={editor} />
			</div>

			<div class="flex justify-end items-center">
				<select
					class="py-2 mr-4 text-sm text-gray-900"
					name="type"
					id="type"
				>
					<option value="blogposts">Blog Posts</option>
					<option value="study">Study</option>
				</select>
				<select
					class="py-2 mr-4 text-sm text-gray-900"
					name="status"
					id="status"
				>
					<option value="public">Public</option>
					<option value="private">Private</option>
				</select>
				<button
					class="bg-gray-200 text-sm text-gray-900 py-2 px-3 rounded-md"
					type="submit"
				>
					Submit
				</button>
			</div>
		</form>
	</div>
</div>


<style>
    @import 'katex/dist/katex.min.css';
    @import 'quill/dist/quill.snow.css';
    @import 'textEditor.css';
    @import 'highlight.js/styles/atom-one-dark.min.css';

    :global(.ql-ui) {
        color: black;
    }
</style>
