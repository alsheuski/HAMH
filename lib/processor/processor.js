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

        const links = parser.getAllLinkElements(fileContent);
        const buttons = parser.getAllButtonsElements(fileContent);

        reportBuilder.addToReport({
            text: 'Links',
            tag: 'h3'
        });
        reportBuilder.addToReport({
            text: links,
            tag: 'ol'
        });

        reportBuilder.addToReport({
            text: 'Buttons',
            tag: 'h3'
        });
        reportBuilder.addToReport({
            text: buttons,
            tag: 'ol'
        });

        reportBuilder.build([
            {
                type: printerTargets.CONSOLE
            },
            {
                type: printerTargets.FILE_HTML,
                filename: `report_${filename}`
            }
        ])
    }
};