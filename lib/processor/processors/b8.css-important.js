const files = require('../../files');
const rgx = require('../../parser/parsers/regex');
const linkToCriteria = 'https://up.htmlacademy.ru/htmlcss/21/criteries#basic-8';

module.exports = {
    getData: function () {
        return new Promise((resolve, reject) => {
            try {
                const styleFiles = files.getAllStyleFiles();
                const result = {
                    payload: []
                };

                styleFiles.forEach(fileName => {
                    const fileContent = files.fileRead(fileName);

                    rgx.findInLine(fileContent, /important/, fileName)
                        .then(res => {
                            const importantLines = res;

                            result.meta = { linkToCriteria };
                            result.payload = [
                                ...result.payload,
                                ...importantLines
                            ];

                            resolve({ styleImportant: result });
                        })
                        .catch(err => reject(err))
                });
            } catch (e) {
                console.log(e);
                reject(e);
            }
        })
    }
};