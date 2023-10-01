import { getFiles } from './files';
import kebabCase from './kebabCase';

export async function getAllTags() {
	const posts = await getFiles();
	const tagCount: any = {};
	posts.forEach((post) => {
		if (post.tags && post.published !== true) {
			post.tags.forEach((tag) => {
				const formattedTag = kebabCase(tag);
				if (formattedTag in tagCount) {
					tagCount[formattedTag] += 1;
				} else {
					tagCount[formattedTag] = 1;
				}
			});
		}
	});

	return tagCount;
}
