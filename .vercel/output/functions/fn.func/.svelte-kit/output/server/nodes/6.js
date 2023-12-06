import * as universal from '../entries/pages/blog/_slug_/_page.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_slug_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/blog/[slug]/+page.ts";
export const imports = ["_app/immutable/nodes/6.7f7b32cc.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/index.26320ab0.js","_app/immutable/chunks/PageHead.d9a41ba3.js","_app/immutable/chunks/siteMetaData.50fe7652.js","_app/immutable/chunks/singletons.9b0afd92.js"];
export const stylesheets = ["_app/immutable/assets/6.39c44837.css"];
export const fonts = [];
