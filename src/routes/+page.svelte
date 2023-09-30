<script lang="ts">
	import type { PageData } from './$types';

	import PageHead from '$lib/components/PageHead.svelte';
	import BlogList from '$lib/components/BlogList.svelte';

	export let data: PageData;
	console.log(data);
	let max_display: number = 5;
</script>

<PageHead title="Home" description="An awesome blog about development with Svelte" />

<BlogList {max_display} posts={data.posts} />
