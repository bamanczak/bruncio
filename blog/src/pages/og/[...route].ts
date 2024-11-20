import { getCollection } from "astro:content";

export const prerender = true;

const blogs = await getCollection("blog");

// Transform the collection into an object
const pages = Object.fromEntries(
    blogs.map(({ id, slug, data }) => [id, { data, slug }]),
);

import { OGImageRoute } from "astro-og-canvas";

export const { getStaticPaths, GET } = OGImageRoute({
    // The name of your dynamic route segment.
    // In this case it’s `route`, because the file is named `[...route].ts`.
    param: "route",

    // A collection of pages to generate images for.
    pages,

    // For each page, this callback will be used to customize the OG image.
    getImageOptions: async (_, { data, slug }: (typeof pages)[string]) => {
        return {
            title: data.title,
            description: data.description,
            dir: "ltr",
            border: { color: [0, 0, 0], width: 40, side: "inline-start" },
            bgGradient: [[236, 179, 55]],
            bgImage: {
                path: "./src/images/og_bg.png",
                fit: "fill"
            },
            padding: 170,
            font: {
                title: {
                    color: [0, 0, 0],
                    families: ["PixChicago"],
                    size: 42,
                    lineHeight: 1.6,
                },
                description: {
                    color: [0, 0, 0],
                    families: ["PixChicago"],
                    size: 22,
                    lineHeight: 1.6,
                }
            },
            fonts: ["./public/fonts/PixChicago.woff"]
        };
    },
});