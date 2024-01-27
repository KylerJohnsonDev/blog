import type { PageServerLoad } from './$types';
import { getAllTagsWithCount } from '$lib/utils/tags';

export const prerender = true;
export const load: PageServerLoad = async () => {
	const tagsWithCount: Record<string, number> = await getAllTagsWithCount();
	const sortedTags: string[] = Object.keys(tagsWithCount).sort((a: string, b: string) =>
		a.localeCompare(b)
	);
	return { tagsWithCount, sortedTags };
};
