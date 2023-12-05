<script lang="ts">
	import {siteMetadata} from "$lib/siteMetaData";
	import { page } from '$app/stores';

	export let title: string;
	export let description: string;
	export let imageUrl: string;
	export let canonicalUrl: string;

	const name = 'Kyler Johnson';
	const jobTitle = 'Sr. Principal Software Engineer'
	const defaultTitle = `${name} | ${jobTitle}`;
	const formattedTitle = title ? `${title} | ${name}` : defaultTitle;
</script>

<svelte:head>
	<title>{formattedTitle}</title>

	<meta property="og:site_name" content={formattedTitle} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:author" content={name} />

	<meta name="robots" content="follow, index" />
	<meta name="description" content={description} />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content={imageUrl} />
	<meta name="twitter:site" content={siteMetadata.twitter} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
	<link
			rel="canonical"
			href={canonicalUrl ? canonicalUrl : `$page.url.href`}
	/>
</svelte:head>
