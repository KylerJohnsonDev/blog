<script lang="ts">
	import kebabCase from '$lib/utils/kebabCase';

	export let tag: string;
</script>

<a
	href={`/tags/${kebabCase(tag)}`}
	class="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
>
	{tag.split(' ').join('-')}
</a>
