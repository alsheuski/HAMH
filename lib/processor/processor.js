const files = require('../files');
const parser = require('../parser/parser');
const printerTargets = require('../printer/targets');
const reportBuilder = require('../reports/report-builder');
const spinner = require('../cli-spinner');

const commonHeaderInfo = require('./processors/common.header-info');

const b2processor = require('./processors/b2.style-links');
const b5processor = require('./processors/b5.html-validator');
const b6processor = require('./processors/b6.style-files');
const b8processor = require('./processors/b8.css-important');

module.exports = {
    processFile: (filename) => {
        if (!files.fileExists(filename)) {
            console.log(chalk.red(`-> ${filename} doesn\'t exists!`));
        }

        const fileContent = files.fileRead(filename);

        if (!fileContent) {
            console.log(chalk.red(`-> Error with reading ${filename}`));
            return;
        }

        const promises = [];

        spinner.start();

        promises.push(commonHeaderInfo.getData());
        promises.push(b2processor.getData(fileContent));
        promises.push(b5processor.validate(fileContent));
        promises.push(b6processor.getData());
        promises.push(b8processor.getData());

        const links = parser.getAllLinkElements(fileContent);
        const buttons = parser.getAllButtonsElements(fileContent);

        Promise.all(promises).then(res => {
            console.log(` done in ${spinner.stop()} seconds`);

            res.forEach(item => {
                // console.log(item);
                reportBuilder.addToReport({ ...item });
            });

            reportBuilder.addToReport({ links });
            reportBuilder.addToReport({ buttons });

            reportBuilder.build([
                {
                    type: printerTargets.FILE_HTML,
                    filename: `report_${filename}`
                }
            ]);

        }, err => spinner.stop);
    }
};