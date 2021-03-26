const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const WorkboxPlugin = require("workbox-webpack-plugin");
const { join } = require("path");

// facing issue in deployment on QA1
//used ImageminPlugin to improve lcp
// const ImageminPlugin = require("imagemin-webpack-plugin").default;
const getEnvFromDeployEnv = require("./get-env-from-deploy-env");
const getEnvFromEnvFile = require("./get-env-from-env-file");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodemonPlugin = require("nodemon-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = env => {
    const isLocalMachineBuild = env.local === "true";

    if (env.local === "true") {
        process.env.BABEL_ENV = "development";
    } else {
        process.env.BABEL_ENV = "production";
    }
    const entryName = "client";
    const clientBuildPath = "build/public";
    const outFolder = clientBuildPath;

    // set env variables based on deployment env like qa1, qa2, etc.
    env = {
        ...env,
        ...getEnvFromDeployEnv(env.deploy, env.local),
        ...getEnvFromEnvFile(path.resolve(process.cwd(), `env/.env.${env.environment}`)),
    };
    const definePluginObj = {};
    Object.keys(env).forEach(key => {
        definePluginObj[`process.env.${key}`] = JSON.stringify(env[key]);
    });
    const plugins = [
        new webpack.DefinePlugin(definePluginObj),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            filename: path.join(process.cwd(), outFolder, "index.html"),
            template: path.join(process.cwd(), "src/index.html"),
            minify: {
                removeComments: !isLocalMachineBuild,
                collapseWhitespace: !isLocalMachineBuild,
                removeRedundantAttributes: !isLocalMachineBuild,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: !isLocalMachineBuild,
                minifyCSS: !isLocalMachineBuild,
                minifyURLs: !isLocalMachineBuild,
            },
            ...env,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(process.cwd(), "src/manifest.json"),
                    to: path.resolve(process.cwd(), outFolder, "manifest.json"),
                    toType: "file",
                    force: true,
                },
                {
                    from: path.resolve(process.cwd(), "src/assets/favicon.ico"),
                    to: path.resolve(process.cwd(), outFolder, "favicon.ico"),
                    toType: "file",
                    force: true,
                },
                {
                    from: path.resolve(process.cwd(), "src/assets/.well-known"),
                    to: path.resolve(process.cwd(), outFolder),
                    toType: "dir",
                    force: true,
                },
                {
                    from: path.resolve(process.cwd(), "src/robots.txt"),
                    to: path.resolve(process.cwd(), outFolder, "robots.txt"),
                    toType: "file",
                    force: true,
                },
                {
                    from: path.resolve(process.cwd(), "public/images/icons/"),
                    to: path.resolve(process.cwd(), `${outFolder}/images/icons/`),
                    toType: "dir",
                    force: true,
                },
            ],
        }),
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
        new ESLintPlugin({
            eslintPath: path.resolve(process.cwd(), "node_modules", "eslint"),
            useEslintrc: true,
        }),
    ];

    const miniCssFileName = "css/style.[contenthash:12].css";
    const miniCssChunkName = "css/[name].[contenthash:12].chunk.css";

    if (!isLocalMachineBuild) {
        // facing issue in deployment on QA1
        // if (process.platform !== "win32") {
        //     plugins.push(new ImageminPlugin());
        // }
        plugins.push(
            new WorkboxPlugin.InjectManifest({
                swSrc: join(process.cwd(), "src/service-worker.js"),
                swDest: "service-worker.js",
                mode: !isLocalMachineBuild ? "production" : "development",
                exclude: [
                    /\.map$/,
                    /manifest$/,
                    /\.htaccess$/,
                    /service-worker\.js$/,
                    /sw\.js$/,
                ],
            })
        );
        plugins.push(
            new MiniCssExtractPlugin({
                filename: miniCssFileName,
                chunkFilename: miniCssChunkName,
            })
        );
    } else {
        // plugins.push(new webpack.HotModuleReplacementPlugin());
        plugins.push(
            new NodemonPlugin({
                script: path.resolve(process.cwd(), "index.js"),
                watch: [path.resolve(process.cwd(), outFolder), path.resolve(process.cwd(), "index.js")],
                verbose: true,
                env,
            })
        );
        plugins.push(
            new WorkboxPlugin.InjectManifest({
                swSrc: join(process.cwd(), "src/service-worker.js"),
                swDest: "service-worker.js",
                mode: "development",
                exclude: [
                    /\.map$/,
                    /manifest$/,
                    /\.htaccess$/,
                    /service-worker\.js$/,
                    /sw\.js$/,
                ],
            })
        );
    }

    let stats = {
        // timings: false,
        hash: false,
        version: false,
        builtAt: false,
        assets: false,
        entrypoints: false,
        modules: false,
        chunks: false,
        children: false,
    };

    const entry = {
        [entryName]: "./src/index.js",
    };

    return {
        entry: entry,
        target: "web",
        output: {
            filename: isLocalMachineBuild ? "[name].js" : "[name].[contenthash:12].js",
            chunkFilename: isLocalMachineBuild ? "[name].bundle.js" : "[name].[contenthash:12].bundle.js",
            path: path.resolve(process.cwd(), outFolder),
            publicPath: "/",
        },
        resolve: {
            alias: {
                src: path.resolve(process.cwd(), "src/"),
            },
            extensions: [".ts", ".tsx", ".js", ".jsx"],
            fallback: {
                crypto: require.resolve("crypto-browserify"),
                stream: require.resolve("stream-browserify"),
            },
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: [
                        "babel-loader",
                        {
                            loader: "ts-loader",
                            options: {
                                configFile: "tsconfig.json",
                            },
                        },
                    ],
                },
                {
                    test: /.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ["babel-loader"],
                },
                {
                    test: /\.css$/i,
                    use: [
                        isLocalMachineBuild ? "style-loader" : MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                modules: {
                                    localIdentName: "[name]__[local]",
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif|svg|woff2?)$/i,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: isLocalMachineBuild
                                    ? "[path][name].[ext]"
                                    : "[path][name].[contenthash:12].[ext]",
                                emitFile: true,
                            },
                        },
                    ],
                },
            ],
        },
        watchOptions: {
            ignored: /node_modules/,
        },
        stats,
        plugins,
    };
};
