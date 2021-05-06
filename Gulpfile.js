const shell = require("shelljs");
const { series } = require("gulp");
const puppeteer = require("puppeteer");
const lighthouse = require("lighthouse");
const { URL } = require("url");
const PORT = 3000;

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
    shell.exec(
        `node index.js`,
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

async function generateReports() {
    const url = `http://localhost:${PORT}`;

    // Use Puppeteer to launch headful Chrome and don't use its default 800x600 viewport.
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
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

    console.log(
        `Lighthouse scores: ${Object.values(lhr.categories)
            .map(c => c.score)
            .join(", ")}`
    );

    await browser.close();
}

async function killServer() {
    shell.exec(`kill -9 $(lsof -t -i:${PORT})`, { async: false });
}

async function compareResults() {}

exports.default = series(creatFreshBuild, startServer, generateReports, killServer, compareResults);
