import type { PageServerLoad } from './$types';
import { getFiles } from '$lib/utils/files';

export const load: PageServerLoad = async (data) => {
	const { url } = data;
	const posts = await getFiles();
	const publishedPosts = posts
		.filter((post) => post.published)
		.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

	return { posts: publishedPosts };
};
