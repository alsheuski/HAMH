const files = require('../files');
const parser = require('../parser/parser');
const printerTargets = require('../printer/targets');
const reportBuilder = require('../reports/report-builder');
const spinner = require('../cli-spinner');

const b2processor = require('./processors/b2.style-links');
const b5validatorHtml = require('./processors/b5.html-validator');
const b6styleFiles = require('./processors/b6.style-files');
const b8styleImportant = require('./processors/b8.css-important');

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

        const generationDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

        promises.push(b2processor.getData(fileContent));
        promises.push(b5validatorHtml.validate(fileContent));
        promises.push(b6styleFiles.getData());
        promises.push(b8styleImportant.getData());

        const links = parser.getAllLinkElements(fileContent);
        const buttons = parser.getAllButtonsElements(fileContent);

        Promise.all(promises).then(res => {
            console.log(` done in ${spinner.stop()} seconds`);

            reportBuilder.addToReport({ generationDate });

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