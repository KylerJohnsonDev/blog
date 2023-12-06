import { s as slugFromPath } from "./slugFromPath.js";
async function getFiles() {
  const modules = /* @__PURE__ */ Object.assign({ "/src/posts/angular-lazy-loading.md": () => import("./angular-lazy-loading.js"), "/src/posts/attribute-directives.md": () => import("./attribute-directives.js"), "/src/posts/build-once-deploy-anywhere.md": () => import("./build-once-deploy-anywhere.js"), "/src/posts/drag-and-drop.md": () => import("./drag-and-drop.js"), "/src/posts/functional-interceptors-angular-15.md": () => import("./functional-interceptors-angular-15.js"), "/src/posts/polling-http-angular-rxjs.md": () => import("./polling-http-angular-rxjs.js"), "/src/posts/refactoring-ngrx-in-2022.md": () => import("./refactoring-ngrx-in-2022.js"), "/src/posts/rx-patterns.md": () => import("./rx-patterns.js"), "/src/posts/super-charge-ts-dev-with-prettier-and-eslint.md": () => import("./super-charge-ts-dev-with-prettier-and-eslint.js") });
  const postPromises = Object.entries(modules).map(
    ([path, resolver]) => resolver().then(
      (post) => ({
        slug: slugFromPath(path),
        ...post.metadata
      })
    )
  );
  return Promise.all(postPromises);
}
export {
  getFiles as g
};
