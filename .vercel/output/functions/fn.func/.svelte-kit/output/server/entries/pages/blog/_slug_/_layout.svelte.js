import { c as create_ssr_component, v as validate_component, f as add_attribute, h as escape, g as each } from "../../../../chunks/index2.js";
import { S as SectionContainer } from "../../../../chunks/SectionContainer.js";
import { C } from "../../../../chunks/SectionContainer.js";
import { T as Tag } from "../../../../chunks/Tag.js";
import { s as siteMetadata } from "../../../../chunks/siteMetaData.js";
import { p as portrait } from "../../../../chunks/kyler_johnson.js";
const PageTitle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1 class="${"text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14"}">${slots.default ? slots.default({}) : ``}</h1>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const postDateTemplate = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(SectionContainer, "SectionContainer").$$render($$result, {}, {}, {
    default: () => {
      return `
    <article><div class="${"xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700"}"><header class="${"pt-6 xl:pb-6"}"><div class="${"space-y-1 text-center"}"><dl class="${"space-y-10"}"><div><dt class="${"sr-only"}">Published on</dt>
                            <dd class="${"text-base font-medium leading-6 text-gray-500 dark:text-gray-400"}"><time${add_attribute("datetime", data.currentPost?.date, 0)}>${escape(new Date(data.currentPost?.date).toLocaleDateString(siteMetadata.locale, postDateTemplate))}</time></dd></div></dl>
                    <div>${validate_component(PageTitle, "PageTitle").$$render($$result, {}, {}, {
        default: () => {
          return `${escape(data.currentPost.title)}`;
        }
      })}</div></div></header>
            <div class="${"divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0 grid-rows-[auto 1fr]"}" style="${"grid-template-rows: auto 1fr;"}"><dl class="${"pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700"}"><dt class="${"sr-only"}">Author</dt><dd><div class="${"flex items-center space-x-2"}">${`<img${add_attribute("src", portrait, 0)} width="${"38px"}" height="${"38px"}" alt="${"Kyler Johnson's Avatar"}" class="${"h-10 w-10 rounded-full"}">`}
                            <dl class="${"whitespace-nowrap text-sm font-medium leading-5"}"><dt class="${"sr-only"}">Name</dt><dd class="${"text-gray-900 dark:text-gray-100"}">${escape(siteMetadata.author)}</dd><dt class="${"sr-only"}">Twitter</dt><dd>${`<a${add_attribute("href", siteMetadata.twitter, 0)} class="${"text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"}">${escape(siteMetadata.twitter.replace("https://twitter.com/", "@"))}</a>`}</dd></dl></div></dd></dl>
                <div class="${"divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0"}"><div class="${"prose max-w-none pt-10 pb-8 dark:prose-dark"}">${slots.default ? slots.default({}) : ``}</div></div>
                <footer><div class="${"divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y"}">${data.currentPost.tags.length ? `<div class="${"py-4 xl:py-8"}"><h2 class="${"text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400"}">Tags
                                </h2>
                                <div class="${"flex flex-wrap"}">${each(data.currentPost.tags, (tag) => {
        return `${validate_component(Tag, "Tag").$$render($$result, { tag }, {}, {})}`;
      })}</div></div>` : ``}
                        ${data.next || data.prev ? `<div class="${"flex justify-between py-4 xl:block xl:space-y-8 xl:py-8"}">${data.prev ? `<div><h2 class="${"text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400"}">Previous Article
                                        </h2>
                                        <div class="${"text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"}"><a${add_attribute("href", `/blog/${data.prev.slug}`, 0)}>${escape(data.prev.title)}</a></div></div>` : ``}
                                ${data.next ? `<div><h2 class="${"text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400"}">Next Article
                                        </h2>
                                        <div class="${"text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"}"><a${add_attribute("href", `/blog/${data.next.slug}`, 0)}>${escape(data.next.title)}</a></div></div>` : ``}</div>` : ``}</div>
                    <div class="${"pt-4 xl:pt-8"}"><a href="${"/blog"}" class="${"text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"}">← Back to the blog
                        </a></div></footer></div></div></article>`;
    }
  })}`;
});
export {
  Layout as default,
  C as pre
};
