#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('./lib/inquirer');
const processor = require('./lib/processor/processor');

const beforeRun = () => {
    clear();

    console.log(
        chalk.yellow(
            figlet.textSync('HAMH', { horizontalLayout: 'full' })
        )
    );
    console.log(
        chalk.blue(
            'HTMLAcademy Mentor\'s Helper CLI v.0.5.0'
        )
    );
    console.log('');
};


const run = async () => {
    const filesToCheck = (await inquirer.askFilesToCheck()).files;

    for (let i = 0; i < filesToCheck.length; i += 1) {
        processor.processFile(filesToCheck[i]);
    }
};

beforeRun();
run();



