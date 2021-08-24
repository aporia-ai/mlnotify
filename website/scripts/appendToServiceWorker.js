/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path')
const fs = require('fs-extra')
const dotenv = require('dotenv')

const appendToServiceWorker = async (config, options) => {
	dotenv.config()

	const notifyServiceWorkerPath = path.resolve(__dirname, '../src/notify-service-worker.js')
	let notifyServiceWorker = await fs.readFile(notifyServiceWorkerPath, 'utf8')
	notifyServiceWorker = notifyServiceWorker.replace(
		'process.env.GRIDSOME_FIREBASE_APP_CONFIG',
		process.env.GRIDSOME_FIREBASE_APP_CONFIG,
	)
	const outPath = path.join(config.outputDir, options.serviceWorkerPath)
	await fs.writeFile(outPath, `\n${notifyServiceWorker}`, { flag: 'a' })
}

appendToServiceWorker({ outputDir: path.resolve(__dirname, '../dist') }, { serviceWorkerPath: 'sw.js' })
