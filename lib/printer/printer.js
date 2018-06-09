const consolePrinter = require('./printers/console');
const filePrinter = require('./printers/file');

module.exports = {
    print: {
        console: (data) => {
            consolePrinter.print(data);
        },
        file: (data, filename) => {
            filePrinter.print(data, filename);
        }
    }
};
