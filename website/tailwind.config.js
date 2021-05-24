module.exports = {
	purge: {
		content: ['./src/**/*.vue', './src/**/*.scss', './src/**/*.js', './src/**/*.html'],
	},
	darkMode: false,
	theme: {
		colors: {
			transparent: 'transparent',
			white: ['#FBFBFB'],
			black: '#262A33',
			blue: ['', '#53A7EE', 'rgba(236, 245, 255, 0.5)'],
			red: '#F23B27',
			grey: ['#828282', '#828282', '#E5E5E5', '', '', '#F1F1F1', '', '#717C89'],
			'black-05-opacity': 'rgba(38, 42, 51, 0.7)',
		},
		fontFamily: {
			heebo: ['Heebo', 'sans-serif'],
			orelega: ['Orelega One', 'cursive'],
		},

		extend: {
			fontSize: {
				'5xl': ['2.625rem', { lineHeight: '1' }],
				'6xl': ['3.5rem', { lineHeight: '1' }],
			},
			borderWidth: {
				1: '1px',
			},
			width: {
				120: '30rem',
				84: '21rem',
			},
			height: {
				120: '30rem',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
