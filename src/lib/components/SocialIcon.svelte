<script lang="ts">
	import IconifyIcon from '@iconify/svelte';

	export let iconifyIconName: string;
	export let fontSizeClass: string;
	export let linkUrl: string;

</script>

<a
	class="text-sm transition"
	target="_blank"
	rel="noopener noreferrer"
	href={linkUrl}
>
	<IconifyIcon icon={iconifyIconName} class={`fill-current hover:text-primary-600 dark:hover:text-primary-400 ${fontSizeClass}`}/>
</a>
