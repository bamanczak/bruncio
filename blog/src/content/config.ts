import { defineCollection, z } from 'astro:content';

const stringToDate = z.string().pipe(z.coerce.date());

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: stringToDate,
		updatedDate: z.coerce.date().optional(),
		heroImage: image().refine((img) => img.width >= 100, {
			message: "Cover image must be at least 1080 pixels wide!",
		}),
		ogImage: z.string().optional(),
		id: z.string(),
		icon: z.string(),
	}),
});

const projects = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: stringToDate,
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		id: z.string(),
		icon: z.string(),
	}),
});

export const collections = {
	'blog': blog,
	'projects': projects
};
