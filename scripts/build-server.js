require("../config/env");

const config = require("../config/webpack.config.server");
const webpack = require("webpack");

const fs = require("fs-extra");
const paths = require("../config/paths");
function build() {
  fs.emptyDirSync(paths.serverBuild);
  const compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      console.log(err);
      if (err) {
        reject(err);
      }
      return resolve({
        stats
      });
    });
  });
}

build();
