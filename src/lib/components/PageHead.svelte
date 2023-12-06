<script lang="ts">
	import {siteMetadata} from "$lib/siteMetaData";
	import { page } from '$app/stores';

	export let title: string;
	export let description: string;
	export let image = "%sveltekit.assets%/kyler_johnson_dev.png"
	export let imageAlt: string;
	export let canonicalUrl: string;
	export let ogType: 'website' | 'article' = 'website'
	export let date: string;
	export let tags: string[];

	const name = 'Kyler Johnson';
	const jobTitle = 'Sr. Principal Software Engineer'
	const defaultTitle = `${name} | ${jobTitle}`;
	const formattedTitle = title ? `${title} | ${name}` : defaultTitle;
</script>

<svelte:head>
	<title>{formattedTitle}</title>

	<meta property="og:site_name" content={formattedTitle} />
	<meta property="og:title" content={title} />
	<meta property="og:image" content={image} />
	<meta property="og:image:alt" content={imageAlt} />
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
	<meta name="twitter:card" content={image} />
	<meta name="twitter:site" content={siteMetadata.twitter} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	<link
		rel="canonical"
		href={canonicalUrl ? canonicalUrl : `$page.url.href`}
	/>
</svelte:head>
