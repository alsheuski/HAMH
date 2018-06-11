const vnu = require('validator-nu');

module.exports = {
    validate: function (markup) {
        return new Promise((resolve, reject) => {
            vnu.validate(markup).then(function (result) {
                resolve(result);
            }).catch(function (e) {
                console.log(e);
                reject(e);
            });
        });
    }
};