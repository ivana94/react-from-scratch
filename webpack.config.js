const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    mode: "development",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.?js$/,
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
    devServer: {
        static: {
            directory: path.join(__dirname, "/dist"),
        },
        compress: true,
        hot: true,
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.join(__dirname, "src", "index.html"),
            inject: "body",
        }),
    ],
};
