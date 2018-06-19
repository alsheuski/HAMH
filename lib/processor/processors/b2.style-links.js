const parser = require('../../parser/parser');
const linkToCriteria = 'https://up.htmlacademy.ru/htmlcss/21/criteries#basic-2';

module.exports = {
    getData: function (markup) {
        return new Promise((resolve, reject) => {
            try {
                const result = {};
                result.payload = parser.getAllStyleFiles(markup);
                result.meta = { linkToCriteria };

                console.log('[Processors] -> B2 resolved.');
                resolve({ styleLinks: result });
            } catch (e) {
                console.log(e);
                reject(e);
            }
        })
    }
};