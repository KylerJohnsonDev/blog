import type { PageData } from '../routes/$types'

export interface BlogPost {
    slug: string;
    title: string;
    author: string;
    description: string;
    date: string;
    published: boolean;
    tags: string[];
    image: string | undefined;
    imageAlt: string | undefined;
    canonicalUrl: string | undefined;
}

export interface BlogPostLayoutData {
    currentPost: BlogPost;
    prev: BlogPost | undefined;
    next: BlogPost | undefined;
    hasMorePosts: boolean;
}