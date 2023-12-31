export interface PageHeadProps {
	title: string;
	description: string;
	image: string;
	imageAlt: string;
	canonicalUrl: string;
	date: string;
	tags: string[];
}

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

export interface PaginationInformation {
	currentPage: number;
	totalPages: number;
	hasPrevPage: boolean;
	prevPageUri: string;
	hasNextPage: boolean;
	nextPageUri: string;
}
