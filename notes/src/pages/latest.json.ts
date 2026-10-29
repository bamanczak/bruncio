import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { formatDate } from '../posts';

// The 3 newest notes (pinned or not), read by frombruno.com's Notes section; public/_headers lets any site read it.
export const GET: APIRoute = async ({ site }) => {
	const posts = (await getCollection('blog'))
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
		.slice(0, 3)
		.map((p) => ({
			title: p.data.title,
			description: p.data.description,
			date: p.data.pubDate.toISOString(),
			dateText: formatDate(p.data.pubDate), // as the notes list shows it, whatever the reader's time zone
			url: new URL(`/${p.id}`, site).href,
		}));
	return new Response(JSON.stringify(posts), { headers: { 'Content-Type': 'application/json' } });
};
