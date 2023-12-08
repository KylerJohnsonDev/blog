import type { PageServerLoad } from './$types';
import { getFiles } from '$lib/utils/files';
import type { BlogPost, PaginationInformation } from '$lib/types';

const MAX_POSTS = 5;

export const load: PageServerLoad = async (data) => {
	const { url } = data;
	const posts = await getFiles();
	const publishedPosts = posts
		.filter((post) => post.published)
		.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

	const totalPages = Math.ceil(publishedPosts.length / MAX_POSTS);
	const pageParam = url.searchParams.get('page');
	const currentPage = pageParam ? Number(pageParam) : 1;
	let displayedPosts: BlogPost[];
	if (currentPage > 1) {
		const prevPage = currentPage - 1;
		const startIndex = prevPage * MAX_POSTS;
		const endIndex = startIndex + MAX_POSTS;
		displayedPosts = publishedPosts.slice(startIndex, endIndex);
	} else {
		displayedPosts = publishedPosts.slice(0, MAX_POSTS);
	}

	const hasPrevPage: boolean = currentPage - 1 > 0;
	const prevPageUri = currentPage - 1 === 1 ? `/blog` : `/blog?page=${currentPage - 1}`;
	const hasNextPage: boolean = currentPage + 1 <= totalPages;
	const nextPageUri = `/blog?page=${currentPage + 1}`;

	const paginationInformation: PaginationInformation = {
		currentPage,
		totalPages,
		hasNextPage,
		nextPageUri,
		hasPrevPage,
		prevPageUri
	};

	return { posts: displayedPosts, paginationInformation };
};
