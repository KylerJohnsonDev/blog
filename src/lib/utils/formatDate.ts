import { siteMetadata } from '$lib/siteMetaData';

export function formatDate(date: string) {
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};
	const now = new Date(date).toLocaleDateString(siteMetadata.locale, options);

	return now;
}
