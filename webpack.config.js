const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/index.tsx",
    target: "web",
    mode: "development",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".js", ".tsx", ".json", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: "awesome-typescript-loader"
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test:/\.less$/,
                use: [
                    "style-loader", //loads styles into style tag
                    "css-loader", //resolves css syntax(import, url)
                    "less-loader" //compile less
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.html")
        }),
        new CopyWebpackPlugin({
            patterns: [
              { from: path.resolve(__dirname, 'config.json')},
            ],
          })
    ]
}