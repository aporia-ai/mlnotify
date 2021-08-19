/* eslint-disable @typescript-eslint/no-var-requires */
const nodeExternals = require('webpack-node-externals')

module.exports = {
	externals: [nodeExternals()],
}
