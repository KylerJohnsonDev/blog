import type { PageData } from '../routes/$types'

export interface BlogPost {
    slug: string;
    title: string;
    author: string;
    description: string;
    date: string;
    published: boolean;
    tags: string[];
}

export interface BlogPostLayoutData {
    currentPost: BlogPost;
    prev: BlogPost | undefined;
    next: BlogPost | undefined;
    hasMorePosts: boolean;
}