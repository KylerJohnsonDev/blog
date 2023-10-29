import type { PageServerLoad } from '../$types';
import { getFiles } from '$lib/utils/files';
import type {BlogPost, BlogPostLayoutData} from "$lib/types";

const MAX_POSTS = 5;

export const load: PageServerLoad = async ({ url }) => {
    const posts = await getFiles();
    const publishedPosts: BlogPost[] = posts
        .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))
        .filter((post) => post.published)
        .slice(0, MAX_POSTS)


    const hasMorePosts: boolean = posts.length > MAX_POSTS;
    const pathSegment = url.pathname.split('/').pop()
    const currentPostIndex: number = publishedPosts.findIndex((p) => p.slug === pathSegment)

    const currentPost: BlogPost = publishedPosts[currentPostIndex]
    const prev: BlogPost | undefined = currentPostIndex > 0 ? publishedPosts[currentPostIndex - 1] : undefined
    const next: BlogPost | undefined = currentPostIndex <= publishedPosts.length - 2 ? publishedPosts[currentPostIndex + 1] : undefined

    return { currentPost, prev, next , hasMorePosts } satisfies BlogPostLayoutData;
};