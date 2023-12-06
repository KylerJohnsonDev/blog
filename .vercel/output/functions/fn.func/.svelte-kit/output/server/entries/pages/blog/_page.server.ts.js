import { g as getFiles } from "../../../chunks/files.js";
const MAX_POSTS = 5;
const load = async (data) => {
  const { url } = data;
  const posts = await getFiles();
  const publishedPosts = posts.filter((post) => post.published).sort((a, b) => new Date(a.date) > new Date(b.date) ? -1 : 1);
  const totalPages = Math.ceil(publishedPosts.length / MAX_POSTS);
  const pageParam = url.searchParams.get("page");
  const currentPage = pageParam ? Number(pageParam) : 1;
  let displayedPosts;
  if (currentPage > 1) {
    const prevPage = currentPage - 1;
    const startIndex = prevPage * MAX_POSTS + 1;
    const endIndex = startIndex + MAX_POSTS;
    displayedPosts = publishedPosts.slice(startIndex, endIndex);
  } else {
    displayedPosts = publishedPosts.slice(0, MAX_POSTS);
  }
  const hasPrevPage = currentPage - 1 > 0;
  const prevPageUri = currentPage - 1 === 1 ? `/blog` : `/blog?page=${currentPage - 1}`;
  const hasNextPage = currentPage + 1 <= totalPages;
  const nextPageUri = `/blog?page=${currentPage + 1}`;
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
