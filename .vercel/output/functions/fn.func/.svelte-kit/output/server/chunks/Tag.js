import { c as create_ssr_component, f as add_attribute, h as escape } from "./index2.js";
import { k as kebabCase } from "./kebabCase.js";
const Tag = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { tag } = $$props;
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
    $$bindings.tag(tag);
  return `<a${add_attribute("href", `/tags/${kebabCase(tag)}`, 0)} class="${"mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"}">${escape(tag.split(" ").join("-"))}</a>`;
});
export {
  Tag as T
};
