const shell = require("shelljs");
const chalk = require("chalk");

const output = shell.exec("git status -s", {
    async: false,
    cwd: process.cwd(),
    silent: true,
});

const newFiles = output.stdout.split("\n").filter(val => val && val.startsWith("A "));
const KEBAB_CASE_REGEX = /^[a-z0-9]*(-[a-z0-9]+)*.(ts|tsx|png|svg|jpg|jpeg)$/;

const errorFiles = [];
const fileNamingErrors = [];
const fileSeparator = process.platform === "win32" ? "\\" : "/";

newFiles.forEach(file => {
    const fileNameWithPath = file.split("  ")[1];
    if (fileNameWithPath.match(/^(src).+(js|jsx)$/)) {
        errorFiles.push(fileNameWithPath);
    }

    const folderParts = fileNameWithPath.split(fileSeparator);
    if (!folderParts[folderParts.length - 1].match(KEBAB_CASE_REGEX)) {
        fileNamingErrors.push(file);
    }
});
if (errorFiles.length) {
    console.log(chalk.black.bgRed("These are following files added should be typescript files:"));
    console.log(chalk.black.bgRed(errorFiles.join("\n")));
    process.exit(1);
}

if (fileNamingErrors.length) {
    console.log(chalk.black.bgRed("These are following file(s) added should follow kebab-case naming convention:"));
    console.log(chalk.black.bgRed(fileNamingErrors.join("\n")));
    process.exit(1);
}
