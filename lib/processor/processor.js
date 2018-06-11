const files = require('../files');
const parser = require('../parser');
const printerTargets = require('../printer/targets');
const reportBuilder = require('../reports/report-builder');

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

        const styleFiles = parser.getAllStyleFiles(fileContent);
        const links = parser.getAllLinkElements(fileContent);
        const buttons = parser.getAllButtonsElements(fileContent);

        reportBuilder.addToReport({ styleFiles });
        reportBuilder.addToReport({ links });
        reportBuilder.addToReport({ buttons });

        reportBuilder.build([
            {
                type: printerTargets.FILE_HTML,
                filename: `report_${filename}`
            }
        ])
    }
};