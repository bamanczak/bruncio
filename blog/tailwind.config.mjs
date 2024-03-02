/** @type {import('tailwindcss').Config} */
import preline from 'preline/plugin.js';
import svelteUx from 'svelte-ux/plugins/tailwind.cjs';
import flowbite from 'flowbite/plugin'

export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./public/**/*.astro',
		'node_modules/preline/dist/*.js',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
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
			50: '#FFF5F2',
			100: '#FFF1EE',
			200: '#FFE4DE',
			300: '#FFD5CC',
			400: '#FFBCAD',
			500: '#FE795D',
			600: '#EF562F',
			700: '#EB4F27',
			800: '#CC4522',
			900: '#A5371B'
		},
		extend: {
			fontFamily: {
				sans: [
					'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
				],
			},
		},
	},
	plugins: [preline, svelteUx],
	darkMode: false,
}
