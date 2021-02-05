const { merge } = require("webpack-merge");
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const common = require("./webpack.common");

const config = () => {
    const plugins = [];
    plugins.push(
        new CompressionPlugin({
            filename: "[file].gz[query]",
            algorithm: "gzip",
            test: /\.(js|css|html|svg|woff|woff2|jpg)$/,
            // compressionOptions: { level: 11 },
            minRatio: Number.MAX_SAFE_INTEGER, // to compress all assets because we are serving files based on encoding support of browser
            deleteOriginalAssets: false,
            // cache: "../build",
        }),
        new CompressionPlugin({
            filename: "[file].br[query]",
            algorithm: "brotliCompress",
            test: /\.(js|css|html|svg|woff|woff2|jpg)$/,
            // compressionOptions: { level: 11 },
            minRatio: Number.MAX_SAFE_INTEGER,
            deleteOriginalAssets: false,
            // cache: "../build",
        })
        // new BundleAnalyzerPlugin({
        //     analyzerMode: "static",
        //     openAnalyzer: false,
        // })
    );

    return {
        mode: "production",
        optimization: {
            minimize: true,
            mergeDuplicateChunks: true,
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    extractComments: false,
                    terserOptions: {
                        output: {
                            comments: false,
                        },
                    },
                }),
            ],
            splitChunks: false,
        },
        devServer: {
            historyApiFallback: true,
        },
        plugins,
    };
};

module.exports = (env = {}) => {
    const extraConfig = config(env);
    const commonConfig = common({ ...env });
    const merged = merge(commonConfig, extraConfig);
    return merged;
};
