import type {PageServerLoad} from "./$types";
import {getFiles} from "$lib/utils/files";

import type {BlogPost, PaginationInformation} from "$lib/types";
import kebabCase from "$lib/utils/kebabCase";

const MAX_POSTS = 5;

export const load: PageServerLoad = async (data) => {
    console.log(data)
    const { url } = data;
    const tagFromUrl = url.pathname.split('/').pop();
    const posts = await getFiles();
    const publishedPostsForTag = posts.filter((post) => {
        const hasMatchingTag = post.tags
            .map((tag) => kebabCase(tag))
            .some((formattedTag) => formattedTag === tagFromUrl)

        return post.published && hasMatchingTag
    }).sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))

    const totalPages = Math.ceil(publishedPostsForTag.length / MAX_POSTS)
    const pageParam = url.searchParams.get('page');
    const currentPage = pageParam ? Number(pageParam) : 1
    let displayedPosts: BlogPost[];
    if(currentPage > 1) {
        const prevPage = currentPage - 1;
        const startIndex = prevPage * MAX_POSTS + 1;
        const endIndex = startIndex + MAX_POSTS;
        displayedPosts = publishedPostsForTag.slice(startIndex, endIndex);
    } else {
        displayedPosts = publishedPostsForTag.slice(0, MAX_POSTS);
    }

    const hasPrevPage: boolean = currentPage - 1 > 0
    const prevPageUri = currentPage - 1 === 1 ? `/tags/${tagFromUrl}` : `/tags/${tagFromUrl}?page=${currentPage - 1}`
    const hasNextPage: boolean = currentPage + 1 <= totalPages
    const nextPageUri = `/tags/${tagFromUrl}?page=${currentPage + 1}`

    const paginationInformation: PaginationInformation = {
        currentPage,
        totalPages,
        hasNextPage,
        nextPageUri,
        hasPrevPage,
        prevPageUri
    }

    return { posts: displayedPosts, paginationInformation };
}