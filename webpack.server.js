const path = require('path');
const Dotenv = require('dotenv-webpack')

module.exports = {
	entry: './server/index.js',
	target: 'node',
	output: {
		path: path.resolve('server-build'),
		filename: 'index.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: "babel-loader"
				}
			},
			/*{
				test: /\.(scss|css)$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},*/
			{
				test: /\.(scss|css)$/,
				use: [
					{
						loader: 'isomorphic-style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[path][name]__[local]___[hash:base64]'
							},
							importLoaders: 1,
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader'
					}
				]
			},
			{
				test: /\.(svg|png)$/,
				use: {
					loader: "file-loader"
				}
			}
		]
	},
	plugins: [
		new Dotenv(
			{path: "./.env"}
		)
	]
}
