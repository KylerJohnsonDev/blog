import { c as create_ssr_component } from "../../chunks/index2.js";
const _error_svelte_svelte_type_style_lang = "";
const css = {
  code: "h2.svelte-a0z7hg{display:flex;flex-direction:column;justify-content:center;align-items:center;font-weight:400;min-height:400px}.errorCode.svelte-a0z7hg{font-size:8rem}.errorMessage.svelte-a0z7hg{font-size:1rem}",
  map: null
};
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<h2 class="${"svelte-a0z7hg"}"><span class="${"errorCode svelte-a0z7hg"}">404</span>
	<span class="${"errorMessage svelte-a0z7hg"}">Page Not Found</span>
</h2>`;
});
export {
  Error as default
};
