module.exports = {
	purge: ['./src/**/*.vue', './src/**/*.scss', './src/**/*.js', './src/**/*.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
		colors: {
			white: '#ffffff',
			black: '#262A33',
			grey: ['#828282', '#E5E5E5'],
		},
		fontFamily: {
			heebo: ['Heebo', 'sans-serif'],
			orelega: ['Orelega-One', 'cursive'],
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
