import { c as create_ssr_component, v as validate_component, f as add_attribute, g as each, h as escape } from "../../../chunks/index2.js";
import { f as formatDate } from "../../../chunks/formatDate.js";
import { T as Tag } from "../../../chunks/Tag.js";
import { P as Paginator } from "../../../chunks/Paginator.js";
import { P as PageHead } from "../../../chunks/PageHead.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filteredBlogPosts;
  let displayedPosts;
  let searchValue = "";
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  filteredBlogPosts = data.posts.filter((post) => {
    const searchContent = post.title + post.description + post.tags.join(" ");
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });
  displayedPosts = data.posts.length > 0 && !searchValue ? data.posts : filteredBlogPosts;
  return `${validate_component(PageHead, "PageHead").$$render(
    $$result,
    {
      title: "Kyler Johnson | Blog",
      description: "A blog for developers interested in web technologies, the web platform, and navigating their careers as developers."
    },
    {},
    {}
  )}

<div class="${"divide-y divide-gray-200 dark:divide-gray-700"}"><div class="${"space-y-2 pt-6 pb-8 md:space-y-5"}"><h1 class="${"text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"}">All Posts
        </h1>
        <div class="${"relative max-w-lg"}"><input aria-label="${"Search articles"}" type="${"text"}" placeholder="${"Search articles"}" class="${"block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"}"${add_attribute("value", searchValue, 0)}>
            <svg class="${"absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"}" xmlns="${"http://www.w3.org/2000/svg"}" fill="${"none"}" viewBox="${"0 0 24 24"}" stroke="${"currentColor"}"><path strokelinecap="${"round"}" strokelinejoin="${"round"}"${add_attribute("strokewidth", 2, 0)} d="${"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"}"></path></svg></div></div>
    <ul>${!filteredBlogPosts.length ? `No posts found.` : `${each(displayedPosts, (post) => {
    return `<li class="${"py-4"}"><article class="${"space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0"}"><dl><dt class="${"sr-only"}">Published on</dt><dd class="${"text-base font-medium leading-6 text-gray-500 dark:text-gray-400"}"><time${add_attribute("datetime", post.date, 0)}>${escape(formatDate(post.date))}</time>
                            </dd></dl>
                        <div class="${"space-y-3 xl:col-span-3"}"><div><h3 class="${"text-2xl font-bold leading-8 tracking-tight"}"><a${add_attribute("href", `/blog/${post.slug}`, 0)} class="${"text-gray-900 dark:text-gray-100"}">${escape(post.title)}
                                    </a></h3>
                                <div class="${"flex flex-wrap"}">${each(post.tags, (tag) => {
      return `${validate_component(Tag, "Tag").$$render($$result, { tag }, {}, {})}`;
    })}
                                </div></div>
                            <div class="${"prose max-w-none text-gray-500 dark:text-gray-400"}">${escape(post.description)}</div>
                        </div></article>
                </li>`;
  })}

            ${validate_component(Paginator, "Paginator").$$render($$result, Object.assign(data.paginationInformation), {}, {})}`}</ul></div>`;
});
export {
  Page as default
};
