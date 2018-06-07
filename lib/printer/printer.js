const chalk = require('chalk');
const TARGET = require('./targets');
const consolePrinter = require('./printers/console');

module.exports = {
    print: (data, targets) => {
        targets.forEach(target => {
            switch (target.type) {
                case TARGET.CONSOLE:
                    consolePrinter.print(data);
                    break;
                case TARGET.FILE:
                    // TODO: print in file
                    break;
                default:
                    console.log(chalk.red(`Unknown print target: ${target}!`));
            }
        })
    }
};
