<script lang="ts">
	import IconifyIcon from '@iconify/svelte';

	export let iconifyIconName: string;
	export let fontSizeClass: string;
	export let linkUrl: string;

</script>

<a
	class="text-sm text-gray-500 transition hover:text-gray-600"
	target="_blank"
	rel="noopener noreferrer"
	href={linkUrl}
>
	<IconifyIcon icon={iconifyIconName} class={`fill-current stroke-gray-500 text-gray-700 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400 ${fontSizeClass}`}/>
</a>
