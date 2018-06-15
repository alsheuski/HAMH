const linkToCriteria = 'https://up.htmlacademy.ru/htmlcss/21/criteries#basic-1';

module.exports = {
    getData: function () {
        return new Promise((resolve, reject) => {
            try {
                const result = {};
                result.payload = null;
                result.meta = { linkToCriteria };

                console.log('\n[Processors] -> B1 resolved.');
                resolve({ markupAllElements: result });
            } catch (e) {
                console.log(e);
                reject(e);
            }
        })
    }
};