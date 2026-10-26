import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			heroImage: image().optional(),
			heroImageAlt: z.string().default(''),
			icon: z.string().default('pixelarticons:article'),
			pinned: z.boolean().default(false),
		}),
});

export const collections = { blog };
