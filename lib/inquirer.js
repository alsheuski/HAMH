const inquirer = require('inquirer');
const files = require('./files');

module.exports = {
    askFilesToCheck: () => {
        const questions = [
            {
                name: 'files',
                type: 'checkbox',
                message: 'Please select files to check:',
                choices: [
                    'index.html',
                    'catalog.html'
                ]
            }
        ];

        return inquirer.prompt(questions);
    }
};
