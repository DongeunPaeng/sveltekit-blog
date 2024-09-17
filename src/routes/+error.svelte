<script lang="ts">
	import { page } from '$app/stores';
</script>

<p>앗, 오류예요. <span class="p-0.5 mr-0.5 text-red-500 font-bold bg-red-100">{$page?.error?.message}</span></p>