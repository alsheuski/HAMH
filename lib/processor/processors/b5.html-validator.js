const vnu = require('validator-nu');
const linkToCriteria = 'https://up.htmlacademy.ru/htmlcss/21/criteries#basic-5';

module.exports = {
    validate: function (markup) {
        return new Promise((resolve, reject) => {
            vnu.validate(markup)
                .then(function (res) {
                    const result = {};

                    result.payload = res;
                    result.meta = { linkToCriteria };

                    console.log('\n[Processors] -> B5 resolved.');
                    resolve({ validationResult: result });
                }).catch(function (e) {
                console.log(e);
                reject(e);
            });
        });
    }
};