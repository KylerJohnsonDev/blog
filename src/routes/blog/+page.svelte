<script lang="ts">
    import {formatDate} from "$lib/utils/formatDate";
    import Tag from "$lib/components/tag.svelte";
    import type { PageData } from './$types';

    let searchValue = ''
    export let data: PageData;

    $: filteredBlogPosts = data.posts.filter((post) => {
        const searchContent = post.title + post.description + post.tags.join(' ')
        return searchContent.toLowerCase().includes(searchValue.toLowerCase())
    })

    // If initialDisplayPosts exist, display it if no searchValue is specified
    $: displayedPosts =
        data.posts.length > 0 && !searchValue ? data.posts : filteredBlogPosts
</script>

<div class="divide-y divide-gray-200 dark:divide-gray-700">
    <div class="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            All Posts
        </h1>
        <div class="relative max-w-lg">
            <input
                    aria-label="Search articles"
                    type="text"
                    bind:value={searchValue}
                    placeholder="Search articles"
                    class="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
                    class="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
            >
                <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
        </div>
    </div>
    <ul>
        {#if !filteredBlogPosts.length}
            No posts found.
        {:else }

            {#each displayedPosts as post}
                <li class="py-4">
                    <article class="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                        <dl>
                            <dt class="sr-only">Published on</dt>
                            <dd class="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                                <time dateTime={post.date}>{formatDate(post.date)}</time>
                            </dd>
                        </dl>
                        <div class="space-y-3 xl:col-span-3">
                            <div>
                                <h3 class="text-2xl font-bold leading-8 tracking-tight">
                                    <a href={`/blog/${post.slug}`} class="text-gray-900 dark:text-gray-100">
                                        {post.title}
                                    </a>
                                </h3>
                                <div class="flex flex-wrap">
                                    {#each post.tags as tag}
                                        <Tag {tag} />
                                    {/each}
                                </div>
                            </div>
                            <div class="prose max-w-none text-gray-500 dark:text-gray-400">
                                {post.description}
                            </div>
                        </div>
                    </article>
                </li>
            {/each}

        { /if }
    </ul>
</div>