"use strict";
exports.__esModule = true;
var colors = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    fg: {
        Red: "\x1b[31m",
        Yellow: "\x1b[33m",
        Green: "\x1b[32m",
        Blue: "\x1b[34m",
        Magenta: "\x1b[35m",
        Cyan: "\x1b[36m",
    },
};
var printMsg = function(msg, color, newline, padding) {
    if (newline === void 0) {
        newline = false;
    }
    if (padding === void 0) {
        padding = 0;
    }
    process.stdout.write("  ");
    if (padding) process.stdout.write(" ".repeat(padding));
    process.stdout.write(color);
    process.stdout.write(colors.Bright);
    process.stdout.write("" + msg);
    process.stdout.write(colors.Reset);
    if (newline) console.log();
};
exports.log_ = function(msg) {
    return printMsg(msg, colors.fg.Green);
};
exports.warn_ = function(msg) {
    return printMsg(msg, colors.fg.Yellow);
};
exports.error_ = function(msg) {
    return printMsg(msg, colors.fg.Red);
};
exports.cyan_ = function(msg) {
    return printMsg(msg, colors.fg.Cyan);
};
exports.log = function(msg) {
    return printMsg(msg, colors.fg.Green, true);
};
exports.warn = function(msg) {
    return printMsg(msg, colors.fg.Yellow, true);
};
exports.error = function(msg) {
    return printMsg(msg, colors.fg.Red, true);
};
exports.cyan = function(msg) {
    return printMsg(msg, colors.fg.Cyan, true);
};
