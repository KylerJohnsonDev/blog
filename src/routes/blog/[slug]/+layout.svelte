<script context="module">
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    export { CodeBlock as pre };
</script>

<script lang="ts">
    import SectionContainer from "$lib/components/SectionContainer.svelte";
    import Tag from "$lib/components/Tag.svelte";
    import PageTitle from "$lib/components/PageTitle.svelte";
    import {siteMetadata} from "$lib/siteMetaData.js";
    import type {BlogPostLayoutData} from "$lib/types";
    import portrait from '$lib/assets/kyler_johnson.jpg';


    const postDateTemplate: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    export let data: BlogPostLayoutData;
</script>

<SectionContainer>

<!--  BlogSEO component should go here - check seo.js file in next -->
    <article>
        <div class="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
            <header class="pt-6 xl:pb-6">
                <div class="space-y-1 text-center">
                    <dl class="space-y-10">
                        <div>
                            <dt class="sr-only">Published on</dt>
                            <dd class="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                                <time dateTime={data.currentPost?.date}>
                                    {new Date(data.currentPost?.date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                                </time>
                            </dd>
                        </div>
                    </dl>
                    <div>
                        <PageTitle>{data.currentPost.title}</PageTitle>
                    </div>
                </div>
            </header>
            <div
                    class="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0 grid-rows-[auto 1fr]"
                    style="grid-template-rows: auto 1fr;"
            >
                <dl class="pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
                    <dt class="sr-only">Author</dt>
                    <dd>
                        <div class="flex items-center space-x-2">
                            {#if portrait}
                                <img
                                    src={portrait}
                                    width="38px"
                                    height="38px"
                                    alt="Kyler Johnson's Avatar"
                                    class="h-10 w-10 rounded-full"
                                />
                            {/if}
                            <dl class="whitespace-nowrap text-sm font-medium leading-5">
                                <dt class="sr-only">Name</dt>
                                <dd class="text-gray-900 dark:text-gray-100">{siteMetadata.author}</dd>
                                <dt class="sr-only">Twitter</dt>
                                <dd>
                                    {#if siteMetadata.twitter}
                                        <a
                                            href={siteMetadata.twitter}
                                            class="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                        >
                                            {siteMetadata.twitter.replace('https://twitter.com/', '@')}
                                        </a>
                                    {/if}
                                </dd>
                            </dl>
                        </div>
                    </dd>
                </dl>
                <div class="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
                    <div class="prose max-w-none pb-8 dark:prose-dark"><slot/></div>
                </div>
                <footer>
                    <div class="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                        {#if data.currentPost.tags.length}
                            <div class="py-4 xl:py-8">
                                <h2 class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                    Tags
                                </h2>
                                <div class="flex flex-wrap">
                                    {#each data.currentPost.tags as tag}
                                    <Tag {tag} />
                                    {/each}
                                </div>
                            </div>
                        {/if}
                        {#if data.next || data.prev}
                            <div class="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                                { #if data.prev}
                                    <div>
                                        <h2 class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                            Previous Article
                                        </h2>
                                        <div class="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                                            <a href={`/blog/${data.prev.slug}`}>{data.prev.title}</a>
                                        </div>
                                    </div>
                                {/if}
                                { #if data.next }
                                    <div>
                                        <h2 class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                            Next Article
                                        </h2>
                                        <div class="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                                            <a href={`/blog/${data.next.slug}`}>{data.next.title}</a>
                                        </div>
                                    </div>
                                {/if}
                            </div>
                        {/if}
                    </div>
                    <div class="pt-4 xl:pt-8">
                        <a
                                href="/blog"
                                class="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        >
                            &larr; Back to the blog
                        </a>
                    </div>
                </footer>
            </div>
        </div>
    </article>
</SectionContainer>