import { s as slugFromPath } from "../../../../chunks/slugFromPath.js";
import { e as error } from "../../../../chunks/index.js";
const load = async ({ params }) => {
  const modules = /* @__PURE__ */ Object.assign({ "/src/posts/angular-lazy-loading.md": () => import("../../../../chunks/angular-lazy-loading.js"), "/src/posts/attribute-directives.md": () => import("../../../../chunks/attribute-directives.js"), "/src/posts/build-once-deploy-anywhere.md": () => import("../../../../chunks/build-once-deploy-anywhere.js"), "/src/posts/drag-and-drop.md": () => import("../../../../chunks/drag-and-drop.js"), "/src/posts/functional-interceptors-angular-15.md": () => import("../../../../chunks/functional-interceptors-angular-15.js"), "/src/posts/polling-http-angular-rxjs.md": () => import("../../../../chunks/polling-http-angular-rxjs.js"), "/src/posts/refactoring-ngrx-in-2022.md": () => import("../../../../chunks/refactoring-ngrx-in-2022.js"), "/src/posts/rx-patterns.md": () => import("../../../../chunks/rx-patterns.js"), "/src/posts/super-charge-ts-dev-with-prettier-and-eslint.md": () => import("../../../../chunks/super-charge-ts-dev-with-prettier-and-eslint.js") });
  let match = {};
  for (const [path, resolver] of Object.entries(modules)) {
    if (slugFromPath(path) === params.slug) {
      match = { path, resolver };
      break;
    }
  }
  const post = await match?.resolver?.();
  if (!post || !post.metadata.published) {
    throw error(404);
  }
  return {
    component: post.default,
    frontmatter: post.metadata
  };
};
export {
  load
};
