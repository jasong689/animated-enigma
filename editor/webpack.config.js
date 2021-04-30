const path = require("path");

module.exports = {
    entry: {
        index: path.resolve(__dirname, "index.ts")
    },
    output: {
        path: path.resolve(__dirname, "build")
    },
    devServer: {
        contentBase: path.join(__dirname),
        compress: true,
        port: 8080
    },
    // devtool: "inline-source-map",
    resolve: {
        extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                }
            },
            {
                test: /\.(ttf|woff)$/,
                use: {
                    loader: 'url-loader',
                }
            }
        ],
    },
    plugins: [],
};