const fs = require('fs');
const path = require('path');

module.exports = {
    getCurrendDirectoryBase: () => {
        return path.basename(process.cwd());
    },

    directoryExists: (filePath) => {
        try {
            return fs.statSync(filePath).isDirectory();
        } catch (err) {
            return false;
        }
    },

    fileExists: (filePath) => {
        try {
            return fs.statSync(filePath).isFile();
        } catch (err) {
            return false;
        }
    },

    fileRead: (filePath) => {
        try {
            return fs.readFileSync(filePath, 'utf8');
        } catch (e) {
            console.log('Error:', e.stack);
            return false;
        }
    }
};