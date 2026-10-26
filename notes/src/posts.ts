import { getCollection } from 'astro:content';

// Pinned first, then newest first.
export async function getPosts() {
	const posts = await getCollection('blog');
	return posts.sort(
		(a, b) => Number(b.data.pinned) - Number(a.data.pinned) || b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
}

export const formatDate = (d: Date) =>
	d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
