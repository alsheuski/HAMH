const files = require('../../files');
const rgx = require('../../parser/parsers/regex');
const linkToCriteria = 'https://up.htmlacademy.ru/htmlcss/21/criteries#basic-8';

module.exports = {
    getData: function () {
        return new Promise((resolve, reject) => {
            try {
                const styleFiles = files.getAllStyleFiles();
                const result = {
                    payload: [],
                    meta: { linkToCriteria }
                };

                if (styleFiles.length === 0) {
                    console.log('\n[Processors] -> B8 resolved.');
                    resolve(result);
                }

                styleFiles.forEach(fileName => {
                    const fileContent = files.fileRead(fileName);

                    rgx.findInLine(fileContent, /important/, fileName)
                        .then(res => {
                            const importantLines = res;
                            result.payload = [
                                ...result.payload,
                                ...importantLines
                            ];

                            console.log('\n[Processors] -> B8 resolved.');
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