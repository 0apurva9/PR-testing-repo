const fs = require("fs");

module.exports = function(envPath) {
    if (!envPath) {
        throw new Error("Env file path undefined");
    }
    const envFileTxt = fs.readFileSync(envPath, { encoding: "utf8" });
    const splittedEnv = envFileTxt.split(/\n|\r\n/g).filter(e => e.trim() !== "");
    const env = {};
    splittedEnv.forEach(keyValue => {
        if (keyValue) {
            const keyValueSplitted = keyValue.split("=");
            if (!keyValueSplitted.length || keyValueSplitted.length < 2) {
                throw new Error(`${keyValue} is not in righ format. Right format: key=value`);
            }
            env[keyValueSplitted[0].trim()] = keyValueSplitted.slice(1).join("=");
        }
    });
    return env;
};
