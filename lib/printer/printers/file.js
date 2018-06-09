const fs = require('fs');

module.exports = {
    print: (data, filename) => {
        try {
            fs.writeFileSync(filename, data, { encoding: 'utf-8' });
        } catch (e) {
            console.log(e);
        }
    }
};
