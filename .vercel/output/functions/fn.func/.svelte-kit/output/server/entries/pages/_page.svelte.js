import { c as create_ssr_component, h as escape, g as each, f as add_attribute, v as validate_component } from "../../chunks/index2.js";
import { P as PageHead } from "../../chunks/PageHead.js";
import { s as siteMetadata } from "../../chunks/siteMetaData.js";
import { f as formatDate } from "../../chunks/formatDate.js";
import { T as Tag } from "../../chunks/Tag.js";
const BlogList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { posts } = $$props;
  let { hasMorePosts } = $$props;
  if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0)
    $$bindings.posts(posts);
  if ($$props.hasMorePosts === void 0 && $$bindings.hasMorePosts && hasMorePosts !== void 0)
    $$bindings.hasMorePosts(hasMorePosts);
  return `<div class="${"divide-y divide-gray-200 dark:divide-gray-700"}"><div class="${"space-y-2 pt-6 pb-8 md:space-y-5"}"><h1 class="${"text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"}">Latest
		</h1>
		<p class="${"text-lg leading-7 text-gray-500 dark:text-gray-400"}">${escape(siteMetadata.description)}</p></div>
	<ul class="${"divide-y divide-gray-200 dark:divide-gray-700"}">${!posts.length ? `No posts found.` : ``}
		${each(posts, (post) => {
    return `<li class="${"py-12"}"><article><div class="${"space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0"}"><dl><dt class="${"sr-only"}">Published on</dt><dd class="${"text-base font-medium leading-6 text-gray-500 dark:text-gray-400"}"><time${add_attribute("datetime", post.date, 0)}>${escape(formatDate(post.date))}</time>
							</dd></dl>
						<div class="${"space-y-5 xl:col-span-3"}"><div class="${"space-y-6"}"><div><h2 class="${"text-2xl font-bold leading-8 tracking-tight"}"><a${add_attribute("href", `/blog/${post.slug}`, 0)} class="${"text-gray-900 dark:text-gray-100"}">${escape(post.title)}
										</a></h2>
									<div class="${"flex flex-wrap"}">${each(post.tags, (tag) => {
      return `${validate_component(Tag, "Tag").$$render($$result, { tag }, {}, {})}`;
    })}
									</div></div>
								<div class="${"prose max-w-none text-gray-500 dark:text-gray-400"}">${escape(post.description)}
								</div></div>
							<div class="${"text-base font-medium leading-6"}"><a${add_attribute("href", `/blog/${post.slug}`, 0)} class="${"text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"}"${add_attribute("aria-label", `Read "${post.title}"`, 0)}>Read more →
								</a>
							</div></div>
					</div></article>
			</li>`;
  })}</ul></div>

${hasMorePosts ? `<div class="${"flex justify-end text-base font-medium leading-6"}"><a href="${"/blog"}" class="${"text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"}" aria-label="${"all posts"}">All Posts →
		</a></div>` : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(PageHead, "PageHead").$$render(
    $$result,
    {
      title: "Kyler Johnson",
      description: "Sr. Principal Software Engineer"
    },
    {},
    {}
  )}

${validate_component(BlogList, "BlogList").$$render(
    $$result,
    {
      posts: data.posts,
      hasMorePosts: data.hasMorePosts
    },
    {},
    {}
  )}`;
});
export {
  Page as default
};
