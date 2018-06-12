const files = require('../../files');
const linkToCriteria = 'https://up.htmlacademy.ru/htmlcss/21/criteries#basic-6';

module.exports = {
    getData: function () {
        return new Promise((resolve, reject) => {
            try {
                const result = {};
                result.payload = files.getAllStyleFiles();
                result.meta = { linkToCriteria };

                resolve({ styleFiles: result });
            } catch (e) {
                console.log(e);
                reject(e);
            }
        })
    }
};