const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'dev';

const getOptimizationConfig = () => {
    const config = {};
    if (!isDev) {
        config.minimizer = [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin(),
        ];
        config.minimize = true;
    }
    return config;
};

module.exports = {
    mode: isDev ? 'development' : 'production',
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[hash].js',
    },
    resolve: {
        extensions: ['.ts', '.js', '.json', '.svg'],
        alias: {
            core: path.resolve(__dirname, "src/core"),
            pages: path.resolve(__dirname, "src/pages"),
            components: path.resolve(__dirname, "src/components"),
            data: path.resolve(__dirname, "src/data"),
            utils: path.resolve(__dirname, "src/utils"),
            entities: path.resolve(__dirname, "src/entities"),
            layouts: path.resolve(__dirname, "src/layouts"),
            router: path.resolve(__dirname, "src/router"),
            controllers: path.resolve(__dirname, "src/controllers/"),
            store: path.resolve(__dirname, "src/store/"),
            services: path.resolve(__dirname, "src/services/"),
            config: path.resolve(__dirname, "src/config"),
            httpClient: path.resolve(__dirname, "src/httpClient/"),
            assets: path.resolve(__dirname, "src/assets/"),
            handlebars: 'handlebars/dist/handlebars',
            'handlebars/runtime': 'handlebars/dist/cjs/handlebars.runtime',
        },
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
        historyApiFallback: true,
        hot: isDev,
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
                exclude: path.resolve(__dirname, 'node_modules'),
            },
            {
                test: /\.ts?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, 'tsconfig.json'),
                        },
                    },
                ],
                exclude: /(node_modules)/,
            },
            {
                test: /\.(png|jpe?g|gif|jp2|webp)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    limit: 8192
                },
            },
        ],
    },
    optimization: getOptimizationConfig(),
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: !isDev,
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.[hash].css',
        }),
        new CleanWebpackPlugin(),
    ],

};