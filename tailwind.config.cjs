/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	plugins: [],
	darkMode: 'class',

	theme: {
		extend: {			
			zIndex: {
			'100': '100',
			'200': '200',
			'300': '300',
			'400': '400',
			'500': '500',

		},
		colors: {
			'primary': '#499bf1',
			'primary-dark': '#2c6e9f',
		},
		dropShadow: {
			'3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
			'4xl': [
				'0 35px 35px rgba(0, 0, 0, 0.25)',
				'0 45px 65px rgba(0, 0, 0, 0.15)'
			]
		  }
		,
		container: {
			center: true,
		},
		height: {
			'600': '60rem',
		},

		animation: {
			'moving-background': 'moving-background 10s ease-in-out',
			'pulse2': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
		},
		keyframes: {
			'moving-background': {
				'0%': {
					transform: 'translateY(300px)',
					opacity: 0
				},
				'33%': {
					opacity: .3
				},
				'66%': {
					opacity: .6
				},
				'100%': {
					transform: 'translateY(0)',
					opacity: .8
				}
			}
		},
		variants: {
			extend: {
			backgroundColor: ["checked"],
			borderColor: ["checked"],
			inset: ["checked"],
			},
		},
}

}
}