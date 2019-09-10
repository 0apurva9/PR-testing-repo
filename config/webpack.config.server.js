const paths = require("./paths");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const eslintFormatter = require("react-dev-utils/eslintFormatter");
const autoprefixer = require("autoprefixer");

console.log("NODE PATH");
console.log(process.env.NODE_PATH);
module.exports = {
  bail: true,
  target: "node",
  entry: [require.resolve("./polyfills"), paths.serverPath],
  output: {
    path: paths.serverBuild,
    filename: "static/js/[name].js"
  },
  node: {
    __dirname: false
  },
  resolve: {
    // This allows you to set a fallback for where Webpack should look for modules.
    // We placed these paths second because we want `node_modules` to "win"
    // if there are any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebookincubator/create-react-app/issues/253
    modules: ["node_modules", paths.appNodeModules].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebookincubator/create-react-app/issues/290
    // `web` extension prefixes have been added for better support
    // for React Native Web.
    extensions: [
      ".web.js",
      ".mjs",
      ".js",
      ".json",
      ".web.jsx",
      ".jsx",
      ".ts",
      ".tsx"
    ],
    alias: {
      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      "react-native": "react-native-web"
    }
    // plugins: [
    //   // Prevents users from importing files from outside of src/ (or node_modules/).
    //   // This often causes confusion because we only process files within src/ with babel.
    //   // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
    //   // please link the files into your node_modules/ and let module-resolution kick in.
    //   // Make sure your source files are compiled, as they will not be processed in any way.
    //   new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])
    // ]
  },
  // externals: [nodeExternals()],
  module: {
    strictExportPresence: true,
    rules: [
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
            options: {
              limit: 10000,
              name: "static/media/[name].[hash:8].[ext]"
            }
          },
          {
            test: /\.(js|jsx|mjs)$/,
            include: [
              paths.appSrc,
              paths.serverPath,
              paths.serverMiddlewarePath
            ],
            use: {
              loader: "babel-loader",
              options: {
                compact: true,
                presets: ["es2015", "react-app"]
              }
            }
          },
          {
            test: /\.css$/,
            include: [paths.appSrc, paths.xelpmocCore],
            use: [
              {
                loader: "css-loader",
                options: {
                  importLoaders: 1,
                  minimize: true,
                  modules: true
                }
              },
              {
                loader: require.resolve("postcss-loader"),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: "postcss",
                  plugins: () => [
                    require("postcss-flexbugs-fixes"),
                    autoprefixer({
                      browsers: [
                        ">1%",
                        "last 4 versions",
                        "Firefox ESR",
                        "not ie < 9" // React doesn't support IE8 anyway
                      ],
                      flexbox: "no-2009"
                    })
                  ]
                }
              }
            ]
          },
          {
            loader: require.resolve("file-loader"),
            // Exclude `js` files to keep "css" loader working as it injects
            // it's runtime that would otherwise processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.js$/, /\.html$/, /\.json$/, /\.tsx?$/],
            options: {
              name: "static/media/[name].[hash:8].[ext]"
            }
          }
        ]
      }
    ]
  }
};
