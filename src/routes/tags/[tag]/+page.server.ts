import type { PageServerLoad } from './$types';
import { getFiles } from '$lib/utils/files';

import type { BlogPost, PaginationInformation } from '$lib/types';
import kebabCase from '$lib/utils/kebabCase';

export const load: PageServerLoad = async (data) => {
	const { url } = data;
	const tagFromUrl = url.pathname.split('/').pop();
	const posts = await getFiles();
	const publishedPostsForTag = posts
		.filter((post) => {
			const hasMatchingTag = post.tags
				.map((tag) => kebabCase(tag))
				.some((formattedTag) => formattedTag === tagFromUrl);

			return post.published && hasMatchingTag;
		})
		.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

	return { posts: publishedPostsForTag };
};
