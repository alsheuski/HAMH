#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files');
const inquirer = require('./lib/inquirer');
const parser = require('./lib/parser');
const printer = require('./lib/printer/printer');
const printerTargets = require('./lib/printer/targets');

clear();

console.log(
    chalk.yellow(
        figlet.textSync('HAMH', { horizontalLayout: 'full' })
    )
);
console.log(
    chalk.blue(
        'HTMLAcademy Mentor\'s Helper CLI v.0.0.1'
    )
);
console.log('');

const processFile = (filename) => {
    if (!files.fileExists(filename)) {
        console.log(chalk.red(`-> ${filename} doesn\'t exists!`));
    }

    const fileContent = files.fileRead(filename);

    if (!fileContent) {
        console.log(chalk.red(`-> Error with reading ${filename}`));
        return;
    }

    const printerTargetConsole = {
        type: printerTargets.CONSOLE
    };

    const printerTargetFile = {
        type: printerTargets.FILE,
        filename: `report_${filename}`
    };

    const links = parser.getAllLinkElements(fileContent);
    printer.print(links, [printerTargetConsole, printerTargetFile]);

    const buttons = parser.getAllButtonsElements(fileContent);
    printer.print(buttons, [printerTargetConsole]);
};

const run = async () => {
    const filesToCheck = (await inquirer.askFilesToCheck()).files;

    for (let i = 0; i < filesToCheck.length; i += 1) {
        processFile(filesToCheck[i]);
    }
};


run();



