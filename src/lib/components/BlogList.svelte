<script lang="ts">
	import { siteMetadata } from '$lib/siteMetaData';
	import { formatDate } from '$lib/utils/formatDate';

	export let posts: App.BlogPost[];
	export let max_display: number = 5;
</script>

<div class="divide-y divide-gray-200 dark:divide-gray-700">
	<div class="space-y-2 pt-6 pb-8 md:space-y-5">
		<h1
			class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"
		>
			Latest
		</h1>
		<p class="text-lg leading-7 text-gray-500 dark:text-gray-400">
			{siteMetadata.description}
		</p>
	</div>
	<ul class="divide-y divide-gray-200 dark:divide-gray-700">
		{#if !posts.length}
			No posts found.
		{/if}
		{#each posts as post}
			<li class="py-12">
				<article>
					<div class="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
						<dl>
							<dt class="sr-only">Published on</dt>
							<dd class="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
								<time dateTime={post.date}>{formatDate(post.date)}</time>
							</dd>
						</dl>
						<div class="space-y-5 xl:col-span-3">
							<div class="space-y-6">
								<div>
									<h2 class="text-2xl font-bold leading-8 tracking-tight">
										<a href={`/blog/${post.slug}`} class="text-gray-900 dark:text-gray-100">
											{post.title}
										</a>
									</h2>
									<!-- <div class="flex flex-wrap">
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div> -->
								</div>
								<div class="prose max-w-none text-gray-500 dark:text-gray-400">
									{post.description}
								</div>
							</div>
							<div class="text-base font-medium leading-6">
								<a
									href={`/blog/${post.slug}`}
									class="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
									aria-label={`Read "${post.title}"`}
								>
									Read more &rarr;
								</a>
							</div>
						</div>
					</div>
				</article>
			</li>
		{/each}
	</ul>
</div>

{#if posts.length > max_display}
	<div class="flex justify-end text-base font-medium leading-6">
		<a
			href="/blog"
			class="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
			aria-label="all posts"
		>
			All Posts &rarr;
		</a>
	</div>
{/if}
