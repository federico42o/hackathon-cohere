/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	plugins: [],
	theme: {
		extend: {			
		zIndex: {
        '100': '100',
		'200': '200',
		'300': '300',
		'400': '400',
		'500': '500',

      },
	  container: {
		center: true,
	  },
	  height: {
		'600': '60rem',
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