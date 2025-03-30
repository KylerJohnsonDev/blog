<script lang="ts">
	import {siteMetadata} from "$lib/siteMetaData";
	import { page } from '$app/stores';

	export let title: string;
	export let description: string;
	export let imageUrl: string;
	export let imageAlt: string;
	export let canonicalUrl = $page.url.href;
	export let ogType: 'website' | 'article' = 'website'
	export let date = new Date().toISOString();
	export let tags: string[] = [];
	
	const defaultImageAlt = 'Image card that introduces Kyler Johnson, a Sr. Principal Software Engineer';
	const defaultImage = `${$page.url.origin}/kyler_johnson_dev.png`
	const name = 'Kyler Johnson';
	const jobTitle = 'Sr. Principal Software Engineer'
	const defaultTitle = `${name} | ${jobTitle}`;
	const formattedTitle = title ? `${title} | ${name}` : defaultTitle;
	const ogImage = imageUrl ? `${$page.url.origin}${imageUrl}` : defaultImage;
	const ogImageAlt = ogImage === defaultImage ? defaultImageAlt : imageAlt;
</script>

<svelte:head>
	<title>{formattedTitle}</title>

	<meta property="og:site_name" content={formattedTitle} />
	<meta property="og:title" content={formattedTitle} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:alt" content={ogImageAlt} />
	<meta property="og:description" content={description} />
	<meta property="og:author" content={name} />
	<meta name="robots" content="follow, index" />
	<meta name="description" content={description} />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:type" content={ogType} />
	{ #if ogType === 'article' }
		<meta property="article:published_time" content={new Date(date).toISOString()} />
		<meta property="article:modified_time" content={new Date(date).toISOString()} />
		<meta property="article:author" content={name} />
		<meta property="article:section" content="Technology" />
		{ #if tags?.length }
			{ #each tags as tag }
				<meta property="article:tag" content={tag} />
			{/each}
		{/if}
	{ /if }
	<meta name="twitter:card" content={ogImage} />
	<meta name="twitter:site" content={siteMetadata.twitter} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />
	<link
		rel="canonical"
		href={canonicalUrl}
	/>
</svelte:head>
