const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const StartServerPlugin = require("start-server-webpack-plugin");

module.exports = {
    entry: [ "webpack/hot/poll?1000", "./src/index" ],
    watch: true,
    target: "node",
    externals: [ nodeExternals({ whitelist: [ "webpack/hot/poll?1000" ] }) ],
    module: {
        rules: [
            { test: /\.js?$/, use: "babel-loader", exclude: /node_modules/ },
        ],
    },
    plugins: [
        new StartServerPlugin("server.js"),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": { BUILD_TARGET: JSON.stringify("server"),
                             NODE_ENV : JSON.stringify("development"),
                             PORT : JSON.stringify("4040"),
                             MONGO_HOST : JSON.stringify("mongodb://127.0.0.1:27017/test"),
                             MONGO_PORT : JSON.stringify("27017")
            },
        }),
    ],
    output: { path: path.join(__dirname, ".build"), filename: "server.js" },
};
