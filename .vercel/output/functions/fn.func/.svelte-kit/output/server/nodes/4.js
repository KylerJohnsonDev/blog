

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.f7a7f8dd.js","_app/immutable/chunks/index.26320ab0.js","_app/immutable/chunks/kyler_johnson.98ebd484.js","_app/immutable/chunks/PageHead.d9a41ba3.js","_app/immutable/chunks/siteMetaData.50fe7652.js","_app/immutable/chunks/singletons.9b0afd92.js"];
export const stylesheets = [];
export const fonts = [];
