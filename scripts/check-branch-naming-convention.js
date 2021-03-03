const shell = require("shelljs");
const chalk = require("chalk");

const output = shell.exec("git branch --show-current", { async: false, cwd: process.cwd(), silent: true });

const BRANCH_REGEX = /^(release-|sprint-).+|[A-Z]{0,5}-\d{2,4}(-([a-z0-9]+))*$|development|production/;

if (!output.stdout.match(BRANCH_REGEX)) {
    console.log(chalk.black.bgRed(`Branch: ${output.stdout} naming is not as per naming convention`));
    process.exit(1);
}
