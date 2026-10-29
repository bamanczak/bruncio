# notes

The plain, readable blog behind [notes.frombruno.com](https://notes.frombruno.com). Built with Astro 7, a pixel look borrowed from [brunc.io](https://brunc.io) and an ordinary font for the words.

## Make targets

| Target | What it does |
| --- | --- |
| `make dev` | Dev server with hot reload at `localhost:4321` |
| `make build` | Static site into `dist/` |
| `make install` | Build, then deploy to Vercel (`vercel link` once first) |
| `make test` | Type check (`astro check`) and a full build |
| `make clean` | Remove `dist/` and `.astro/` |

## Writing a post

Add a `.md` or `.mdx` file to `src/content/blog/`. The filename is the URL.

```yaml
---
title: "Post title"
description: "One line for the list and search"
pubDate: "Oct 23 2026"
heroImage: "../../images/cover.png"   # optional
heroImageAlt: "What's in the picture"  # optional
icon: "pixelarticons:article"          # any pixelarticons name
pinned: true                           # optional, keeps it on top
---
```

The list shows pinned posts first, then newest first, 20 per page.

## Latest notes for frombruno.com

`/latest.json` lists the 3 newest posts (title, description, date, URL), pinned or not. frombruno.com's Notes section fetches it in the browser, so a new post shows up there without rebuilding that site. `vercel.json` adds the CORS header that lets it.
