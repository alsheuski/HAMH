const printer = require('../printer/printer');

module.exports = {
    report: [],
    addToReport: function (data) {
        this.report = [
            ...this.report,
            data
        ];
    },
    build: function (targetsList) {
        try {
            printer.print(this.report, targetsList);
        } catch (e) {
            console.log(e);
        }
    }
};