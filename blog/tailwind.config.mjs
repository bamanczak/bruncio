/** @type {import('tailwindcss').Config} */
import preline from 'preline/plugin.js';

export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./public/**/*.astro',
		'node_modules/preline/dist/*.js',
	],
	theme: {
		backgroundColor: {
			back: "#EBE1DB",
			white: "#FFF",
			black: "#000",
			myblue: "#1E8EBF",
			myyellow: "#ecb337",
			mywhite: "#FAF4E6",
		},
		textColor: {
			// primary: blue,
			// secondary: purple,
			back: "#EBE1DB",
			white: "#FFF",
			black: "#000",
			myyellow: "#ecb337",
			mywhite: "#FAF4E6",
		},
		colors: {
			black: "#000",
			myblue: "#1E8EBF",
			myyellow: "#ecb337",
			mywhite: "#FAF4E6",
		},
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
