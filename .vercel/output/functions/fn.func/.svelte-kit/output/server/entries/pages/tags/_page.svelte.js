import { c as create_ssr_component, v as validate_component, g as each, f as add_attribute, h as escape } from "../../../chunks/index2.js";
import { T as Tag } from "../../../chunks/Tag.js";
import { k as kebabCase } from "../../../chunks/kebabCase.js";
import { P as PageHead } from "../../../chunks/PageHead.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(PageHead, "PageHead").$$render(
    $$result,
    {
      title: "Kyler Johnson | Tags",
      description: "Categories I blog about"
    },
    {},
    {}
  )}

<div class="${"flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0"}"><div class="${"space-x-2 pt-6 pb-8 md:space-y-5"}"><h1 class="${"text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14"}">Tags
        </h1></div>
    <div class="${"flex max-w-lg flex-wrap"}">${data.sortedTags.length === 0 ? `No tags found.` : ``}
        ${each(data.sortedTags, (tag) => {
    return `<div class="${"mt-2 mb-2 mr-5"}">${validate_component(Tag, "Tag").$$render($$result, { tag }, {}, {})}
                <a${add_attribute("href", `/tags/${kebabCase(tag)}`, 0)} class="${"-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"}">${escape(` (${data.tagsWithCount[tag]})`)}</a>
            </div>`;
  })}</div></div>`;
});
export {
  Page as default
};
