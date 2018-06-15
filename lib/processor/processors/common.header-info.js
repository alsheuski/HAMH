const files = require('../../files');

const README = 'Readme.md';

module.exports = {
    getData: function () {
        return new Promise((resolve, reject) => {
            try {
                let result = {
                    payload: [],
                    meta: {}
                };

                const data = {
                    generationDate: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
                };

                if (files.fileExists(README)) {
                    const readme = files.fileRead('Readme.md');
                    const readmeLines = readme.split('\n');
                    data.projectInfo = readmeLines.slice(0, 4).filter(item => item);
                }

                result.payload.push(data);

                resolve({ headerInfo: result });
            } catch (e) {
                console.log(e);
                reject(e);
            }
        })
    }
};
