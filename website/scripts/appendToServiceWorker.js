const path = require('path')
const fs = require('fs-extra')

const appendToServiceWorker = async (config, options) => {
	const notifyServiceWorkerPath = path.resolve(__dirname, '../src/notify-service-worker.js')
	const notifyServiceWorker = await fs.readFile(notifyServiceWorkerPath, 'utf8')
	const outPath = path.join(config.outputDir, options.serviceWorkerPath)
	await fs.writeFile(outPath, `\n${notifyServiceWorker}`, { flag: 'a' })
}

appendToServiceWorker({ outputDir: path.resolve(__dirname, '../dist') }, { serviceWorkerPath: 'sw.js' })
