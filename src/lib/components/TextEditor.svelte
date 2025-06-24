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
	import imageCompression from 'browser-image-compression';

	export let draft;
	export let newPost = true;

	const id = draft?.id;
	const verifiedUser = $page.data.verifiedUser;

	let { title, post: content, type, status } = draft || {};
	let editor: HTMLElement;
	let errorMessage: string;
	let isUploading = false;

	const ALLOWED_TYPES = [
		'image/jpeg',
		'image/png',
		'image/gif',
		'image/webp'
	];
	const MAX_SIZE = 5 * 1024 * 1024; // 5MB
	let lastUploadTime = 0;
	const UPLOAD_RATE_LIMIT_MS = 3000; // 3초에 한 번만 업로드 허용

	function validateImage(file: File) {
		if (!ALLOWED_TYPES.includes(file.type)) {
			throw new Error('JPEG, PNG, GIF, WebP 이미지만 업로드할 수 있습니다.');
		}
		if (file.size > MAX_SIZE) {
			throw new Error('이미지 크기는 최대 5MB까지 허용됩니다.');
		}
		if (!file.name) {
			throw new Error('파일명이 올바르지 않습니다.');
		}
	}

	onMount(async () => {
		window.katex = katex as any;
		const { default: Quill } = await import('quill');

		// 커스텀 이미지 핸들러 정의
		function imageHandler() {
			if (isUploading) return; // 중복 업로드 방지
			const now = Date.now();
			if (now - lastUploadTime < UPLOAD_RATE_LIMIT_MS) {
				alert('이미지 업로드는 3초에 한 번만 가능합니다.');
				return;
			}
			const input = document.createElement('input');
			input.setAttribute('type', 'file');
			input.setAttribute('accept', 'image/*');
			input.click();

			input.onchange = async () => {
				const file = input.files?.[0];
				if (!file) return;

				isUploading = true;
				const originalButton = document.querySelector('.ql-image');
				const prevHtml = originalButton ? originalButton.innerHTML : '';
				if (originalButton) originalButton.innerHTML = '<span class="animate-spin">⏳</span>';

				try {
					// 1. 클라이언트 이미지 검증
					validateImage(file);

					// 2. 이미지 압축 (실패 시 원본 사용)
					let compressedFile = file;
					try {
						compressedFile = await imageCompression(file, {
							maxSizeMB: 1,
							maxWidthOrHeight: 1920,
							useWebWorker: true
						});
					} catch (compressionError) {
						console.warn('이미지 압축 실패, 원본 사용:', compressionError);
					}

					// 4. Presigned URL 발급 API 호출
					const presignedRes = await fetch('/api/presigned-url', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							fileName: compressedFile.name,
							fileType: compressedFile.type,
							fileSize: compressedFile.size
						})
					});

					if (!presignedRes.ok) {
						const errMsg = await presignedRes.text();
						alert('이미지 업로드 준비 중 오류가 발생했습니다.\n' + errMsg);
						return;
					}

					const { url, fields, fileUrl, error } = await presignedRes.json();
					if (error) {
						alert(error);
						return;
					}

					// 5. S3에 직접 업로드 (FormData 사용)
					const formData = new FormData();
					Object.entries(fields).forEach(([k, v]) => formData.append(k, v as string));
					formData.append('file', compressedFile);

					const uploadRes = await fetch(url, {
						method: 'POST',
						body: formData
					});

					if (!uploadRes.ok) {
						alert('이미지 업로드에 실패했습니다.');
						return;
					}

					// 6. 에디터에 이미지 삽입
					const range = quill.getSelection();
					quill.insertEmbed(range ? range.index : 0, 'image', fileUrl);
					lastUploadTime = Date.now(); // 업로드 성공 시 타임스탬프 갱신
				} catch (err: any) {
					alert(err?.message || '알 수 없는 오류로 이미지 업로드에 실패했습니다.');
					console.error('이미지 업로드 오류:', err);
				} finally {
					isUploading = false;
					if (originalButton) originalButton.innerHTML = prevHtml;
				}
			};
		}

		const quill = new Quill(editor, {
			modules: {
				syntax: { hljs },
				toolbar: {
					container: textEditorConfig,
					handlers: {
						image: imageHandler
					}
				}
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
		<form action={newPost ? "/write?/write" : "/write?/edit"} on:submit|preventDefault={handleSubmit}>
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
