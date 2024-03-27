const path = require("path");

module.exports = {
	mode: "development",
	entry: "./src/index.ts",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
		libraryTarget: "umd",
		globalObject: "this",
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js", ".jsx", ".css"],
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
					},
				},
			},
		],
	},
	externals: {
		react: "React",
		"react-dom": "ReactDOM",
	},
};
