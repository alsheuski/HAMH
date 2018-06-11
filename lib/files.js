const fs = require('fs');
const path = require('path');

const ignoreFolders = [
    '.git',
    '.idea',
    'node_modules'
];

function fromDir(startPath, filter) {
    if (!fs.existsSync(startPath)) {
        console.log('no dir found: ', startPath);
        return;
    }

    const files = fs.readdirSync(startPath);
    let foundFiles = [];

    for (let i = 0; i < files.length; i++) {
        if (ignoreFolders.indexOf(files[i]) !== -1) {
            continue;
        }

        const filename = path.join(startPath, files[i]);
        const stat = fs.lstatSync(filename);

        if (stat.isDirectory()) {
            foundFiles = [
                ...foundFiles,
                ...fromDir(filename, filter)
            ]
        }
        else if (filename.indexOf(filter) !== -1) {
            foundFiles = [
                ...foundFiles,
                filename
            ]
        }
    }

    return foundFiles;
}

module.exports = {
    getCurrentDirectoryBase: () => {
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
    },
    getAllStyleFiles: function () {
        return fromDir(process.cwd(), '.css');
    }
};