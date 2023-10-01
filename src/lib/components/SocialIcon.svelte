<script lang="ts">
	export let size: number;
	export let linkUrl: string;
	export let pathToImage: string;
	export let altText: string;
</script>

<a
	class="text-sm text-gray-500 transition hover:text-gray-600"
	target="_blank"
	rel="noopener noreferrer"
	href={linkUrl}
>
	<img
		src={pathToImage}
		alt={altText}
		class={`fill-current text-gray-700 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400 h-${size} w-${size}`}
	/>
</a>
