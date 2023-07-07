/* eslint-disable import/no-unresolved */
/* eslint-disable prefer-regex-literals */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
// const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
// const ImageminMozjpeg = require('imagemin-mozjpeg');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const path = require('path');

module.exports = {
	entry: {
		app: path.resolve(__dirname, 'src/scripts/index.js'),
		// sw: path.resolve(__dirname, 'src/scripts/sw.js'),
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	module: {
		rules: [
			{
				test: /.s?css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
		],
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			minSize: 20000,
			maxSize: 70000,
			minChunks: 1,
			maxAsyncRequests: 30,
			maxInitialRequests: 30,
			automaticNameDelimiter: '~',
			enforceSizeThreshold: 50000,
			cacheGroups: {
				defaultVendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
			},
		},
		minimizer: [
			new CssMinimizerPlugin(),
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, 'src/templates/index.html'),
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/public/'),
					to: path.resolve(__dirname, 'dist/'),
				},
			],
		}),
		new WorkboxWebpackPlugin.GenerateSW({
			swDest: './sw.bundle.js',
			skipWaiting: true,
			clientsClaim: true,
			runtimeCaching: [
				{
					urlPattern: new RegExp('^https://restaurant-api.dicoding.dev/'),
					handler: 'StaleWhileRevalidate',
					options: {
						cacheName: 'restocatalog_pwa',
						cacheableResponse: {
							statuses: [0, 200],
						},
					},
				},
			],
		}),
		// new ImageminWebpackPlugin({
		//   plugins: [
		//     ImageminMozjpeg({
		//       quality: 80,
		//       progressive: true,
		//     }),
		//   ],
		// }),
		new ImageminWebpWebpackPlugin({
			config: [
				{
					test: /\.(jpe?g|png)/,
					options: {
						quality: 60,
					},
				},
			],
			overrideExtension: true,
		}),
		new BundleAnalyzerPlugin({
			openAnalyzer: false,
			analyzerMode: 'static',
		}),
		new MiniCssExtractPlugin({
			// filename: '/src/styles/style.css',
			// filename: '/src/styles/responsive.css'
		}),
	],
};
