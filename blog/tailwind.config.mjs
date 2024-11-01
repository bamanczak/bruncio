/** @type {import('tailwindcss').Config} */
import preline from 'preline/plugin.js';
import svelteUx from 'svelte-ux/plugins/tailwind.cjs';
import defaultTheme from 'tailwindcss/defaultTheme'


export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./public/**/*.astro',
		'node_modules/preline/dist/*.js',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
		'./node_modules/svelte-ux/**/*.{svelte,js}',
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
					'NeuePixelSans', ...defaultTheme.fontFamily.sans
				],
			},
		},
		fontSize: {
			xs: '0.6rem', //changed
			sm: '0.7rem',
			base: '0.8rem', //changed
			xl: '1.25rem',
			'2xl': '1.563rem',
			'3xl': '1.953rem',
			'4xl': '2.441rem',
			'5xl': '3.052rem',
		}
	},
	plugins: [preline, svelteUx],
}
