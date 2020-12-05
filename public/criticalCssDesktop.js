const critical = require("critical");
const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
var buildPath = resolveApp("build");
var inlinecss = "";

function addTextToFile(file_path, new_text, prependString) {
  var position = 0;

  fs.readFile(file_path, function read(err, data) {
    if (err) {
      throw err;
    }
    var file_content = data.toString();
    position = file_content.indexOf(prependString);
    file_content = file_content.substring(position);
    var file = fs.openSync(file_path, "r+");
    var bufferedText = new Buffer.from(new_text + file_content);
    if (position > 0) {
      fs.writeSync(file, bufferedText, 0, bufferedText.length, position);
    }
    fs.close(file);
  });
}

var args = process.argv.slice(2);

if (args[0] == "index") {
  critical.generate(
    {
      /* The path of the Webpack bundle */
      base: buildPath,
      src: resolveApp("build/index.html"),
      dest: resolveApp("build/critical-index.html"),
      inline: false,
      extract: false,
      /* laptop with MDPI screen*/
      width: 1280,
      height: 800,

      /* Ensure that bundled JS file is called */
      penthouse: {
        blockJSRequests: false,
        userAgent:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
        screenshots: {
          basePath: "screenShotInlineHome",
          type: "jpeg", // jpeg or png, png default
          quality: 30 // only applies for jpeg type
        }
      }
    },
    function(err) {
      if (!err) {
        var contents = fs.readFileSync(
          resolveApp("build/critical-index.html"),
          "utf8"
        );
        inlinecss = "  <style>" + contents + "</style>";
        addTextToFile(
          resolveApp("public/index_build.html"),
          inlinecss,
          "</head>"
        );
      } else {
        console.log(err);
      }
    }
  );
}

if (args[0] == "other") {
  console.log("Generating critcal css for other.html.....");
  critical.generate(
    {
      /* The path of the Webpack bundle */
      base: buildPath,
      src: resolveApp("build/other.html"),
      dest: resolveApp("build/critical-other.html"),
      inline: false,
      extract: false,

      /* laptop with MDPI screen*/
      width: 1280,
      height: 800,

      /* Ensure that bundled JS file is called */
      penthouse: {
        blockJSRequests: false,
        userAgent:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
        screenshots: {
          basePath: "screenShotInlineOther",
          type: "jpeg", // jpeg or png, png default
          quality: 30 // only applies for jpeg type
        }
      }
    },
    function(err) {
      if (!err) {
        console.log("inlining other html.....");
        var contents = fs.readFileSync(
          resolveApp("build/critical-other.html"),
          "utf8"
        );
        inlinecss = "  <style>" + contents + "</style>  ";
        addTextToFile(resolveApp("public/other.html"), inlinecss, "</head>");
      } else {
        console.log("Failed others");
      }
    }
  );
}
console.log("Critical CSS Generation completed.....");
