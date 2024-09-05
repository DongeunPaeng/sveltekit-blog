<script lang="ts">
	import { TextEditor } from '$lib/components';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.pageTitle}</title>
</svelte:head>

<!-- TODO: pass title props -->
<TextEditor draft={data.draft} newPost={false} />