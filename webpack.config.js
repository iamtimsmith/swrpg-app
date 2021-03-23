const path = require(`path`);
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './public/js/App.js',
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'public', 'dist')
	},
	plugins: [
		new MiniCssExtractPlugin,
	],
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [MiniCssExtractPlugin.loader, `css-loader`, `sass-loader`]
			}
		]
	}
}
