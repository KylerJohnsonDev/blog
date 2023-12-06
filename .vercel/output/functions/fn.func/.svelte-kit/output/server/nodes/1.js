

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.5c29d730.js","_app/immutable/chunks/index.26320ab0.js"];
export const stylesheets = ["_app/immutable/assets/1.eefcb911.css"];
export const fonts = [];
