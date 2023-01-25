/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	plugins: [],
	theme: {
		extend: {			
			dropShadow: {
			'4xl': ['0px 0px 20px rgba(255, 221, 31, 0.75)', '0 0px 30px rgba(255, 221, 31, 0.95)']
	},zIndex: {
        '100': '100',
		'200': '200',
		'300': '300',
		'400': '400',
		'500': '500',

      },
	  container: {
		center: true,
	  },

	animation: {
		'moving-background': 'moving-background 5s ease-in-out'
	},
	keyframes: {
		'moving-background': {
			'0%': {
				transform: 'translateY(0)',
				opacity: 0
			},
			'33%': {
				opacity: .3
			},
			'66%': {
				opacity: .6
			},
			'100%': {
				transform: 'translateY(-150px)',
				opacity: .8
			}
		}
	},
	colors: {
		background: {
			lightblue: {
				100: '#95eff6',
				200: '##2193b0'
			},
			white: {
				100: '#c8feff',
				200: '##6dd5ed'
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