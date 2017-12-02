"use strict";
const path = require("path");

module.exports = {
    entry: "./src/client.tsx",
    output: {
        filename: "application.js",
        path: path.join(__dirname, "public/javascripts")
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: "ts-loader"
                }
            }
        ]
    }
};
