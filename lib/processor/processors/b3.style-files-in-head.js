const linkToCriteria = 'https://up.htmlacademy.ru/htmlcss/21/criteries#basic-3';

module.exports = {
    getData: function () {
        return new Promise((resolve, reject) => {
            try {
                const result = {};
                result.payload = null;
                result.meta = { linkToCriteria };

                console.log('[Processors] -> B3 resolved.');
                resolve({ styleFilesInHead: result });
            } catch (e) {
                console.log(e);
                reject(e);
            }
        })
    }
};