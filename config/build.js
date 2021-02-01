const shell = require("shelljs");
const warn = require("../scripts/logger").warn;

let args = process.argv.slice(2);

let local = false;
let watch = undefined;
let webpackEnvs = "";
args.forEach(arg => {
    if (arg.match(/--env\.[a-zA-Z0-9].+=[a-zA-Z0-9].+/)) {
        webpackEnvs += `${arg.split(".").join(" ")} `;
    } else if (arg.startsWith("--local")) {
        local = true;
    } else if (arg.startsWith("--watch")) {
        watch = true;
    }
});

// process.env.local to check for local development
webpackEnvs += `--env local=${local}`;

if (!webpackEnvs) {
    console.log("\x1b[31m", "===================================Error===================================");
    console.log("\x1b[31m", "env missing. Example --env.environment=development", "\x1b[0m");
    throw new Error("");
}

let webpackBuildMode = local ? "dev" : "prod";
let watchOption = local || watch ? "--watch" : "";

if (local || watch) {
    webpackEnvs += " --env watch=true";
}

let startScript = `npm run -s verify && npx webpack --config config/webpack.${webpackBuildMode}.js ${watchOption} ${webpackEnvs}`;

if (process.platform === "win32") {
    startScript = `npm run -s verify && webpack --config config/webpack.${webpackBuildMode}.js ${watchOption} ${webpackEnvs}`;
    warn("Run following commands to install webpack globally on windows system:");
    warn("npm i -g webpack && npm i -g webpack-cli");
}
console.log(startScript);
shell.exec(
    `${startScript}`,
    {
        async: true,
        cwd: process.cwd(),
    },
    (code, stdout, stderr) => {
        console.log(code, stdout, stderr);
    }
);
