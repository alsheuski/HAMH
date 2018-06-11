const chalk = require('chalk');
const fs = require('fs');

module.exports = {
    print: (data, filename) => {
        try {
            fs.writeFileSync(filename, data, { encoding: 'utf-8' });
            console.log(chalk.green(`Report file was created: ${filename}`));
        } catch (e) {
            console.log(e);
        }
    }
};
