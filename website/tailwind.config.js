module.exports = {
	purge: ['./src/**/*.vue', './src/**/*.scss', './src/**/*.js', './src/**/*.html'],
	darkMode: false,
	theme: {
		colors: {
			transparent: 'transparent',
			white: ['#FBFBFB'],
			black: '#262A33',
			red: '#F23B27',
			grey: ['#828282', '#E5E5E5', '', '', '', '', '', '#717C89'],
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
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
