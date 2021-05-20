const shell = require("shelljs");
const { series } = require("gulp");
const puppeteer = require("puppeteer");
const lighthouse = require("lighthouse");
const { URL } = require("url");
const PORT = 3000;
// const recomendedStandards = require("./performance-matrics/standardFormats");
const fs = require("fs");
const path = require("path");
const reportsPath = "./performance-metrics/Reports/perfomace-health.json";

function creatFreshBuild(cb) {
    shell.exec(
        `npm run build:LOAD:TEST`,
        {
            async: true,
            cwd: process.cwd(),
        },
        (code, stdout, stderr) => {
            cb();
            console.log(code, stdout, stderr);
        }
    );
}

function startServer(cb) {
    shell.exec(`node index.js`, {
        async: true,
        cwd: process.cwd(),
    });
    cb();
}

async function generateReports() {
    const url = `http://localhost:${PORT}`;

    // Use Puppeteer to launch headful Chrome and don't use its default 800x600 viewport.
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    // Wait for Lighthouse to open url, then inject our stylesheet.
    browser.on("targetchanged", async target => {
        const page = await target.page();
        if (page && page.url() === url) {
            await page.addStyleTag({ content: "* {color: red}" });
        }
    });

    // Lighthouse will open the URL.
    // Puppeteer will observe `targetchanged` and inject our stylesheet.
    const { lhr } = await lighthouse(url, {
        port: new URL(browser.wsEndpoint()).port,
        output: "json",
        logLevel: "info",
    });

    const currentMatrix = {};
    Object.values(lhr.categories).forEach(c => (currentMatrix[c["id"]] = c.score * 100));

    const isReportHistoryAvailable = fs.exists(path.resolve(reportsPath), err => {
        if (!err) {
            // console.log('Previous reports exists');
            return true;
        } else {
            return false;
        }
    });

    if (isReportHistoryAvailable) {
        fs.unlinkSync(path.resolve(reportsPath), err => {
            if (err) {
                console.error(err);
                return;
            }
        });
    }

    fs.writeFile(path.resolve(reportsPath), JSON.stringify(currentMatrix), err => {
        if (err) {
            console.log("Error writing file", err);
        } else {
            console.log("Successfully wrote file");
        }
    });

    await browser.close();
}

async function killServer() {
    shell.exec(`kill -9 $(lsof -t -i:${PORT})`, { async: false });
}

exports.default = series(creatFreshBuild, startServer, generateReports, killServer);
