import * as server from '../entries/pages/tags/_tag_/_page.server.ts.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/tags/_tag_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/tags/[tag]/+page.server.ts";
export const imports = ["_app/immutable/nodes/9.e9f32686.js","_app/immutable/chunks/index.26320ab0.js","_app/immutable/chunks/formatDate.74b87272.js","_app/immutable/chunks/siteMetaData.50fe7652.js","_app/immutable/chunks/Tag.d4fcb269.js","_app/immutable/chunks/Paginator.06200342.js","_app/immutable/chunks/PageHead.d9a41ba3.js","_app/immutable/chunks/singletons.9b0afd92.js"];
export const stylesheets = [];
export const fonts = [];
