module.exports = {
  siteName: 'Gridsome',
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
            icon: 'src/favicon.png',
            shortName: 'ML Notify',
            description: 'ML Notify is a little tool to help you know when your model finished training',
            categories: ['work', 'machine learning', 'artificial intelligence'],
            lang: 'en-US',
            dir: 'auto',
            maskableIcon: true,
            gcmSenderId: '103953800507',
            

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

            svgFavicon: 'favicon.svg',
            msTileColor: '#ffffff',
            appleMaskIcon: 'favicon.svg',
            appleMaskIconColor: '#ffffff',
        }
    }
]
}
