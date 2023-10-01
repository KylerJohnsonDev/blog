<script>
	import { siteMetadata } from '$lib/siteMetaData';
	import SocialIcon from './SocialIcon.svelte';

	const socialIcons = [
		{
			size: 6,
			linkUrl: siteMetadata.github,
			pathToImage: `/contact/github.svg?raw`,
			altText: 'GitHub Logo'
		}
	];
</script>

<footer>
	<div class="mt-16 flex flex-col items-center">
		<div class="mb-3 flex space-x-4">
			{#each socialIcons as icon}
				<SocialIcon {...icon} />
			{/each}
		</div>
		<div class="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
			<div>{siteMetadata.author}</div>
			<div>{` • `}</div>
			<div>{`© ${new Date().getFullYear()}`}</div>
			<div>{` • `}</div>
			<a href="/">{siteMetadata.title}</a>
		</div>
	</div>
</footer>
