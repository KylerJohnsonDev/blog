import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.d93ccaf9.js","_app/immutable/chunks/index.26320ab0.js","_app/immutable/chunks/siteMetaData.50fe7652.js","_app/immutable/chunks/SectionContainer.19e3225a.js"];
export const stylesheets = ["_app/immutable/assets/0.286b3556.css"];
export const fonts = [];
