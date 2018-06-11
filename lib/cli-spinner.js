const Spinner = require('cli-spinner').Spinner;

module.exports = {
    spinner: new Spinner('processing.. %s'),
    start: function () {
        this.spinner.start();
        this.spinner.setSpinnerString('|/-\\');
    },
    stop: function () {
        this.spinner.stop();
    }
};