console.log(process.env.NODE_ENV);
require("ignore-styles");
require("babel-register")({
  ignore: [/(node_modules)/],
  presets: ["es2015", "react-app"]
});
require("./index1");
