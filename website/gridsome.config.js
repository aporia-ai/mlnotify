module.exports = {
	titleTemplate: 'ML Notify',
	siteName: 'ML Notify',
	siteDescription: 'ML Notify',
	siteUrl: 'https://mlnotify.com',
	icon: './src/assets/images/logo.png',
	chainWebpack: config => {
		const svgRule = config.module.rule('svg')
		svgRule.uses.clear()
		svgRule.use('vue-svg-loader').loader('vue-svg-loader')
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
				icon: './src/assets/images/logo.png',
				shortName: 'ML Notify',
				description: 'ML Notify is a little tool to help you know when your model finished training',
				categories: ['work', 'machine learning', 'artificial intelligence'],
				lang: 'en-US',
				dir: 'auto',
				maskableIcon: true,
				gcmSenderId: '103953800507',
				// TODO
				// screenshots: [
				//     {
				//         src: 'src/screenshot1.png',
				//         sizes: '1280x720',
				//         type: 'image/png',
				//     },
				// ],
				// shortcuts: [
				//     {
				//         name: "View Subscriptions",
				//         short_name: "Subscriptions",
				//         description: "View the list of podcasts you listen to",
				//         url: "/subscriptions?utm_source=homescreen",
				//         icons: [{ src: "/icons/subscriptions.png", sizes: "192x192" }]
				//     }
				// ],

				svgFavicon: './src/assets/images/logo.svg',
				msTileColor: '#ffffff',
				appleMaskIcon: './src/assets/images/logo.svg',
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
	],
}
