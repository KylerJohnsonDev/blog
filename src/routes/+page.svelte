<script lang="ts">
	import type { PageData } from './$types';
	import PageHead from '$lib/components/PageHead.svelte';
	import BlogList from '$lib/components/BlogList.svelte';

	export let data: PageData;
</script>

<PageHead title="Home" description="An awesome blog about development with Svelte" />

<BlogList posts={data.posts} hasMorePosts={data.hasMorePosts} />
