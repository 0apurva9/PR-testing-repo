const { merge } = require("webpack-merge");
const common = require("./webpack.common");

const config = () => {
    const plugins = [];

    return {
        mode: "development",
        optimization: {
            minimize: false,
            splitChunks: false,
        },
        devtool: "inline-source-map",
        plugins,
    };
};

module.exports = (env = {}) => {
    const extraConfig = config();
    const commonConfig = common({ ...env });
    const mergedConfig = merge(extraConfig, commonConfig);
    // console.log("webpack config", mergedConfig);
    return mergedConfig;
};
