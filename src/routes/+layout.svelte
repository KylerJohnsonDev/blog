<script lang="ts">
	import '../app.css';
	import { siteMetadata } from '$lib/siteMetaData';
	import headerNavLinks from '$lib/headerNavLinks';
	import Logo from '$lib/components/Logo.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ThemeSwitch from '$lib/components/ThemeSwitch.svelte';
	import MobileNav from '$lib/components/MobileNav.svelte';
	import SectionContainer from "$lib/components/SectionContainer.svelte";
</script>

<SectionContainer>
	<div class="flex h-screen flex-col justify-between">
		<header class="flex items-center justify-between py-10">
			<div>
				<a href="/" aria-label={siteMetadata.headerTitle}>
					<div class="flex items-center justify-between">
						<div class="mr-3">
							<Logo />
						</div>
						{#if typeof siteMetadata.headerTitle === 'string'}
							<div class="hidden h-6 text-2xl font-semibold sm:block">
								{siteMetadata.headerTitle}
							</div>
						{:else}
							{siteMetadata.headerTitle}
						{/if}
					</div>
				</a>
			</div>
			<div class="flex items-center text-base leading-5">
				<div class="hidden sm:block">
					{#each headerNavLinks as link}
						<a href={link.href} class="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4">
							{link.title}
						</a>
					{/each}
				</div>
				<ThemeSwitch />
				<MobileNav />
			</div>
		</header>
		<main class="mb-auto">
			<slot />
		</main>
		<Footer />
	</div>
</SectionContainer>
