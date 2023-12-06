import { c as create_ssr_component, f as add_attribute } from "./index2.js";
const CodeBlock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ref = null;
  return `<div class="${"relative"}"${add_attribute("this", ref, 0)}>${``}
    ${slots.default ? slots.default({}) : ``}</div>`;
});
const SectionContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0"}">${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  CodeBlock as C,
  SectionContainer as S
};
