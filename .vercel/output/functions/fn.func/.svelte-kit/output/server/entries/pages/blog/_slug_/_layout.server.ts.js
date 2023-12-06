import { g as getFiles } from "../../../../chunks/files.js";
const MAX_POSTS = 5;
const load = async ({ url }) => {
  const posts = await getFiles();
  const publishedPosts = posts.sort((a, b) => new Date(a.date) > new Date(b.date) ? -1 : 1).filter((post) => post.published).slice(0, MAX_POSTS);
  const hasMorePosts = posts.length > MAX_POSTS;
  const pathSegment = url.pathname.split("/").pop();
  const currentPostIndex = publishedPosts.findIndex((p) => p.slug === pathSegment);
  const currentPost = publishedPosts[currentPostIndex];
  const prev = currentPostIndex > 0 ? publishedPosts[currentPostIndex - 1] : void 0;
  const next = currentPostIndex <= publishedPosts.length - 2 ? publishedPosts[currentPostIndex + 1] : void 0;
  return { currentPost, prev, next, hasMorePosts };
};
export {
  load
};
