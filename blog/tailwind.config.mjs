/** @type {import('tailwindcss').Config} */
import preline from 'preline/plugin.js';

export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./public/**/*.astro',
		'node_modules/preline/dist/*.js',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
				],
			},
		},
	},
	plugins: [preline],
	darkMode: "class",
}
