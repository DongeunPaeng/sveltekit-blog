<script lang="ts">
	import { page } from '$app/stores';
</script>

<p>헐... <span class="p-0.5 mr-0.5 text-red-500 font-extrabold text-xs bg-red-100">{$page?.error?.message}</span>네요.
	제보해주시겠어요?
</p>