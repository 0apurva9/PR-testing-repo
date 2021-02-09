const shell = require("shelljs");
const pm2 = require("pm2");
const { exit } = require("process");

pm2.list((err, list) => {
    if (list && list.length && list.findIndex(app => app.name === process.argv[2]) !== -1) {
        shell.exec(`npx pm2 delete ${process.argv[2]}`);
    }
    exit(0);
});
