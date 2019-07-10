const path = require('path');

module.exports = {
	entry: {
		App: './app/assets/scripts/App.js'
	},
	output: {
		path: path.resolve(__dirname, './app/temp/scripts'),
		filename: 'App.js'
	},

	module: {
		rules: [
			{
				exclude: /(node_modules|bower_components)/,
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					query: {
						presets: [ 'es2015' ]
					}
				}
			}
		]
	}
};
