const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevMode = process.env.NODE_ENV === "development";

module.exports = {
	entry: { 
		index: "./src/index.js"
	},
	output: {
		filename: "js/[name].js"
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{ loader: MiniCssExtractPlugin.loader },				  				  
					{ 
						loader: "css-loader",
						options: {
							sourceMap: true,
						}
					},
					{
						loader: "postcss-loader",
						options: {
							sourceMap: true
						}
					},
					{ 
						loader: "sass-loader", 
						options: {
							sourceMap: true,
						}
					}
				]
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
			    test: /\.(png|svg|jpg|gif)$/,
			    use: [
					{
						loader: 'file-loader',
						options: {
							name: 'img/[name].[ext]'
						}
				  	}
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'fonts/[[name].[ext]',
						}
				  }
				]
			}
		]
	},
	devServer: {
		port: 8080,
		open: 'chrome'
	},
	plugins: [
		new CleanWebpackPlugin(["dist"]),
		new MiniCssExtractPlugin({
			filename: "css/[name].css",
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		})
	]
}
