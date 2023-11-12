import { getFiles } from './files';
import kebabCase from './kebabCase';
import type {BlogPost} from "$lib/types";

export async function getAllTagsWithCount(): Promise<Record<string, number>> {
	const posts: BlogPost[] = await getFiles();
	const tagCount: Record<string, number> = {};
	posts.forEach((post) => {
		if (post.tags && post.published) {
			post.tags.forEach((tag: string) => {
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
