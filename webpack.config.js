const path = require("path");
const webpack = require("webpack");
const env = process.env.NODE_ENV;

const main_config = {
	entry: {
		app: "./app/app.js",
		meetupblast: "./examples/meetupblast/main.js",
		now: "./examples/now/main.js",
		heatmap: "./examples/heatmap/main.js",
		transport: "./examples/transport/main.js",
		earthquake: "./examples/earthquake/main.js",
		weather: "./examples/weather/main.js",
		list: "./examples/list/main.js",
		nearby: "./examples/nearby/main.js",
		events: "./examples/events/main.js",
		CustomQuery: "./examples/CustomQuery/main.js",
		direction: "./examples/direction/main.js",
		PlacesSearch: "./examples/PlacesSearch/main.js",
		GeoDistanceSlider: "./examples/GeoDistanceSlider/main.js",
		GeoDistanceDropdown: "./examples/GeoDistanceDropdown/main.js"
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].bundle.js",
		publicPath: "/dist/"
	},
	module: {
		rules: [
			{
				test: /.jsx?$/,
				use: "babel-loader",
				include: [
					path.resolve(__dirname, "app"),
					path.resolve(__dirname, "examples")
				],
				exclude: /node_modules/
			},
			{
				test: /node_modules\/JSONStream\/index\.js$/,
				use: ["shebang-loader", "babel-loader"]
			}
		]
	},
	externals: ["ws"]
};

const build_config = {
	entry: {
		meetupblast: "./examples/meetupblast/main.js",
		now: "./examples/now/main.js",
		heatmap: "./examples/heatmap/main.js",
		transport: "./examples/transport/main.js",
		earthquake: "./examples/earthquake/main.js",
		weather: "./examples/weather/main.js",
		list: "./examples/list/main.js",
		nearby: "./examples/nearby/main.js",
		events: "./examples/events/main.js",
		CustomQuery: "./examples/CustomQuery/main.js",
		direction: "./examples/direction/main.js",
		PlacesSearch: "./examples/PlacesSearch/main.js",
		GeoDistanceSlider: "./examples/GeoDistanceSlider/main.js",
		GeoDistanceDropdown: "./examples/GeoDistanceDropdown/main.js"
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].bundle.js",
		publicPath: "/dist/"
	},
	module: {
		rules: [
			{
				test: /.jsx?$/,
				use: "babel-loader",
				include: [
					path.resolve(__dirname, "app"),
					path.resolve(__dirname, "examples")
				],
				exclude: /node_modules/
			},
			{
				test: /node_modules\/JSONStream\/index\.js$/,
				use: ["shebang-loader", "babel-loader"]
			}
		]
	},
	externals: ["ws"]
};

let config = main_config;

if (env === "production") {
	config = build_config;
}

module.exports = config;
