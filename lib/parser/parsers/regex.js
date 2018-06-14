module.exports = {
    findInLine: function (fileContent, pattern, fileName) {
        return new Promise((resolve, reject) => {
            console.log(fileName);
            try {
                let results = [];
                const lines = fileContent.split('\n');

                lines.forEach((line, index) => {
                    if (pattern.exec(line)) {
                        results = [
                            ...results,
                            {
                                text: line,
                                lineNumber: index + 1,
                                fileName
                            }
                        ]
                    }
                });

                resolve(results);
            } catch (e) {
                console.log(e);
                reject(e);
            }
        })
    }
};