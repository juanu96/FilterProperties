const rewire = require('rewire')
const path = require('path')
const fs = require('fs')
const defaults = rewire('react-scripts/scripts/build.js') // If you ejected, use this instead: const defaults = rewire('./build.js')
let config = defaults.__get__('config')

config.optimization.splitChunks = {
	cacheGroups: {
		default: false
	}
}

// change output folder
config.output.path = path.resolve(__dirname, 'dist');

// disable chunks
config.optimization.runtimeChunk = false

// disable LICENSE file creation
config.optimization.minimizer[0].options.extractComments = false
console.log(config)

// Renames main.00455bcf.js to main.js
config.output.filename = 'static/js/[name].js'

// Renames main.b100e6da.css to main.css
config.plugins[5].options.filename = 'static/css/[name].css'
config.plugins[5].options.moduleFilename = () => 'static/css/main.css'
delete config.plugins.splice(6, 1)

// delete build folder
fs.rmSync('./build', { recursive: true, force: true })
