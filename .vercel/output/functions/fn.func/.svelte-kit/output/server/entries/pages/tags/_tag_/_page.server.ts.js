import { g as getFiles } from "../../../../chunks/files.js";
import { k as kebabCase } from "../../../../chunks/kebabCase.js";
const MAX_POSTS = 5;
const load = async (data) => {
  console.log(data);
  const { url } = data;
  const tagFromUrl = url.pathname.split("/").pop();
  const posts = await getFiles();
  const publishedPostsForTag = posts.filter((post) => {
    const hasMatchingTag = post.tags.map((tag) => kebabCase(tag)).some((formattedTag) => formattedTag === tagFromUrl);
    return post.published && hasMatchingTag;
  }).sort((a, b) => new Date(a.date) > new Date(b.date) ? -1 : 1);
  const totalPages = Math.ceil(publishedPostsForTag.length / MAX_POSTS);
  const pageParam = url.searchParams.get("page");
  const currentPage = pageParam ? Number(pageParam) : 1;
  let displayedPosts;
  if (currentPage > 1) {
    const prevPage = currentPage - 1;
    const startIndex = prevPage * MAX_POSTS + 1;
    const endIndex = startIndex + MAX_POSTS;
    displayedPosts = publishedPostsForTag.slice(startIndex, endIndex);
  } else {
    displayedPosts = publishedPostsForTag.slice(0, MAX_POSTS);
  }
  const hasPrevPage = currentPage - 1 > 0;
  const prevPageUri = currentPage - 1 === 1 ? `/tags/${tagFromUrl}` : `/tags/${tagFromUrl}?page=${currentPage - 1}`;
  const hasNextPage = currentPage + 1 <= totalPages;
  const nextPageUri = `/tags/${tagFromUrl}?page=${currentPage + 1}`;
  const paginationInformation = {
    currentPage,
    totalPages,
    hasNextPage,
    nextPageUri,
    hasPrevPage,
    prevPageUri
  };
  return { posts: displayedPosts, paginationInformation };
};
export {
  load
};
