<script lang="ts">
	import type { PageData } from './$types';
	import PageHead from '$lib/components/PageHead.svelte';
	import BlogList from '$lib/components/BlogList.svelte';

	export let data: PageData;

	const description ="Specializing in C# .NET, Angular, and Node.js technologies, I build and maintain high quality, UX-oriented web applications at an enterprise scale. I enjoy doing everything from data modeling and building event driven, cloud-native systems to developing intuitive, aesthetic user interfaces."
</script>

<PageHead 
	title="Sr. Principal Software Engineer"
	description={description}
	imageUrl="/kyler_johnson_dev.png"
	imageAlt="Image card that introduces Kyler Johnson, a Sr. Principal Software Engineer"
	canonicalUrl="https://kylerjohnson.dev"
	ogType="website"
/>

<BlogList posts={data.posts} hasMorePosts={data.hasMorePosts} />
