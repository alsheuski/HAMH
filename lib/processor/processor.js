const files = require('../files');
const parser = require('../parser');
const printerTargets = require('../printer/targets');
const reportBuilder = require('../reports/report-builder');
const validatorHtml = require('../html-validator');
const spinner = require('../cli-spinner');

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
        const styleLinks = parser.getAllStyleFiles(fileContent);

        promises.push(validatorHtml.validate(fileContent));

        const styleFiles = files.getAllStyleFiles();
        const links = parser.getAllLinkElements(fileContent);
        const buttons = parser.getAllButtonsElements(fileContent);

        Promise.all(promises).then(res => {
            console.log(` done in ${spinner.stop()} seconds`);

            reportBuilder.addToReport({ generationDate });
            reportBuilder.addToReport({ styleLinks });
            reportBuilder.addToReport({ validationResult: res[0] });
            reportBuilder.addToReport({ styleFiles });
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