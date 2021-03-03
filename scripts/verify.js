const path = require("path");
const fs = require("fs");

const logger = require("./logger");

const packageJson = require(path.resolve(process.cwd(), `package.json`));

const depsList = ["", ...Object.keys(packageJson.devDependencies), ...Object.keys(packageJson.dependencies)];
const reqList = [];

depsList.every(dep => {
    try {
        const nodeModulesPath = path.resolve(process.cwd(), `node_modules/${dep}`);
        fs.readdirSync(nodeModulesPath);
    } catch (e) {
        reqList.push(dep);
        if (!dep) return false;
    }
    return true;
});

if (reqList.length > 0) {
    if (reqList.includes("")) {
        logger.error("No 💩 can happen unless you run:");
        logger.warn("npm install\n");
    } else {
        logger.error("To err is human.. 🍺");
        logger.warn(`You must install: ${reqList.join(", ")}\n`);
    }
    process.exit(1);
}
