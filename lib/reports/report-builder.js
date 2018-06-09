const chalk = require('chalk');
const printer = require('../printer/printer');
const TARGET = require('../printer/targets');
const htmlBuilder = require('./builders/html');

module.exports = {
    report: [],
    addToReport: function (data) {
        this.report = [
            ...this.report,
            data
        ];
    },
    build: function (targetsList) {
        try {
            targetsList.forEach((target) => {
                switch (target.type) {
                    case TARGET.CONSOLE:
                        printer.print.console(this.report.map(item => item.text));
                        break;
                    case TARGET.FILE_HTML:
                        printer.print.file(htmlBuilder.createHtml(this.report), target.filename);
                        break;
                    default:
                        console.log(chalk.red(`Unknown print target: ${target}!`));
                }
            })
        } catch (e) {
            console.log(e);
        }
    }
};