import { slugFromPath } from '$lib/slugFromPath';
import type {BlogPost} from "$lib/types";

export async function getFiles(): Promise<BlogPost[]> {
	const modules = import.meta.glob(`/src/posts/*.{md,svx,svelte.md}`);

	const postPromises = Object.entries(modules).map(([path, resolver]) =>
		resolver().then(
			(post) =>
				({
					slug: slugFromPath(path),
					...(post as unknown as App.MdsvexFile).metadata
				} as BlogPost)
		)
	);

	return Promise.all(postPromises);
}
