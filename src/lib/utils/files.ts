import { slugFromPath } from '$lib/slugFromPath';

export async function getFiles(): Promise<App.BlogPost[]> {
	const modules = import.meta.glob(`/src/posts/*.{md,svx,svelte.md}`);

	const postPromises = Object.entries(modules).map(([path, resolver]) =>
		resolver().then(
			(post) =>
				({
					slug: slugFromPath(path),
					...(post as unknown as App.MdsvexFile).metadata
				} as App.BlogPost)
		)
	);

	return Promise.all(postPromises);
	// const blog = await Promise.all(postPromises);
	// return blog;
}
