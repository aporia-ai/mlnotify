module.exports = {
	titleTemplate: 'ML Notify',
	siteName: 'ML Notify',
	siteDescription: 'MLNotify is an open-source tool that keeps track of model training for you, and sends web, mobile, or email notifications the second training is complete.',
	siteUrl: process.env.GRIDSOME_BASE_URL,
	icon: './src/assets/logo-dark.png',
	chainWebpack: config => {
		const svgRule = config.module.rule('svg')
		svgRule.uses.clear()
		svgRule
			.use('babel-loader')
			.loader('babel-loader')
			.end()
			.use('vue-svg-loader')
			.loader('vue-svg-loader')
			.options({
				svgo: {
					plugins: [{ prefixIds: true }],
				},
			})
	},
	plugins: [
		{
			use: 'gridsome-plugin-pwa',
			options: {
				disableServiceWorker: false,
				serviceWorkerPath: 'sw.js',
				cachedFileTypes: 'js,json,css,html,png,jpg,jpeg,svg,gif',
				disableTemplatedUrls: false,

				manifestPath: 'manifest.json',
				title: 'ML Notify',
				startUrl: '/',
				display: 'standalone',
				statusBarStyle: 'default',
				themeColor: '#ffffff',
				backgroundColor: '#ffffff',
				icon: './src/assets/logo-maskable.png',
				shortName: 'ML Notify',
				description: 'ML Notify is a useful tool that notifies you when your model is finished training',
				categories: ['work', 'machine learning', 'artificial intelligence'],
				lang: 'en-US',
				dir: 'auto',
				maskableIcon: true,
				gcmSenderId: '103953800507',
				svgFavicon: '/logo-dark.svg',
				msTileColor: '#ffffff',
				appleMaskIcon: '/logo-dark.svg',
				appleMaskIconColor: '#ffffff',
			},
		},
		{
			use: 'gridsome-plugin-typescript',
		},
		{
			use: 'gridsome-plugin-tailwindcss',
			options: {
				purgeConfig: {
					content: ['./src/**/*.vue', './src/**/*.scss', './src/**/*.js', './src/**/*.html'],
					whitelist: ['body', 'html', 'img', 'a', 'g-image', 'g-image--lazy', 'g-image--loaded', 'active'],
					defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
				},
			},
		},
		{
			use: '@gridsome/plugin-sitemap',
			options: {
				cacheTime: 600000,
			},
		},
		{
			use: 'gridsome-plugin-gtm',
			options: {
				id: 'GTM-MBSTH6F',
				enabled: true,
			},
		},
	],
}
