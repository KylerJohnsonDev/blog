import type { PageServerLoad } from './$types';
import { getFiles } from '$lib/utils/files';

const MAX_POSTS = 5;

export const load: PageServerLoad = async ({ url }) => {
    const posts = await getFiles();
    const publishedPosts = posts.filter((post) => post.published)
        .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))
        .slice(0, MAX_POSTS);

    const hasMorePosts = posts.length > MAX_POSTS;

    return { posts: publishedPosts, hasMorePosts };
};