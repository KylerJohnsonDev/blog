<script lang="ts">
	import type { PageData } from './$types';
	import PageHead from '$lib/components/PageHead.svelte';
	import BlogList from '$lib/components/BlogList.svelte';

	export let data: PageData;
</script>

<PageHead title="" description="A former Senior .NET Developer turned front-end engineer, focused on Angular, SvelteKit, and Next.js/React." />

<BlogList posts={data.posts} hasMorePosts={data.hasMorePosts} />
