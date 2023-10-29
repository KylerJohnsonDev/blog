import type { PageServerLoad } from './$types';
import { getFiles } from '$lib/utils/files';
import type {BlogPost} from "$lib/types";

const MAX_POSTS = 5;

export const load: PageServerLoad = async (data) => {
    const { url } = data;
    console.log(data)
    const posts = await getFiles();
    const publishedPosts = posts.filter((post) => post.published)
        .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))

    const numberOfPages = publishedPosts.length / MAX_POSTS;
    const pageParam = url.searchParams.get('page');
    const currentPage = pageParam ? Number(pageParam) : 1
    let displayedPosts: BlogPost[];
    if(currentPage > 1) {
        const startIndex = currentPage * MAX_POSTS;
        const endIndex = startIndex + MAX_POSTS;
        displayedPosts = publishedPosts.slice(startIndex, endIndex);
    } else {
        displayedPosts = publishedPosts.slice(0, MAX_POSTS);
    }

    return { posts: displayedPosts, numberOfPages, currentPage };
};