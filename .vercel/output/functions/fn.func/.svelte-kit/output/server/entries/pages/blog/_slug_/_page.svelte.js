import { c as create_ssr_component, v as validate_component, m as missing_component } from "../../../../chunks/index2.js";
import { P as PageHead } from "../../../../chunks/PageHead.js";
const ArticleTitle_svelte_svelte_type_style_lang = "";
const ArticleMeta_svelte_svelte_type_style_lang = "";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let component;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  component = data.component;
  return `${validate_component(PageHead, "PageHead").$$render(
    $$result,
    {
      title: data.frontmatter.title,
      description: data.frontmatter.description
    },
    {},
    {}
  )}

${validate_component(component || missing_component, "svelte:component").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
