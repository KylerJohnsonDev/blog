<script lang="ts">
    import type { PageData } from './$types';
    import Tag from "$lib/components/Tag.svelte";
    import kebabCase from "$lib/utils/kebabCase.js";
    import PageHead from "$lib/components/PageHead.svelte";

    export let data: PageData;
</script>

<PageHead title="Tags" description="Categories I blog about" />

<div class="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
    <div class="space-x-2 pt-6 pb-8 md:space-y-5">
        <h1 class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
            Tags
        </h1>
    </div>
    <div class="flex max-w-lg flex-wrap">
        { #if data.sortedTags.length === 0 }
            No tags found.
        {/if}
        {#each data.sortedTags as tag}
            <div class="mt-2 mb-2 mr-5">
                <Tag {tag} />
                <a href={`/tags/${kebabCase(tag)}`} class="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300">
                    {` (${data.tagsWithCount[tag]})`}
                </a>
            </div>
        {/each}
    </div>
</div>