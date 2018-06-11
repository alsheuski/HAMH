const Spinner = require('cli-spinner').Spinner;

module.exports = {
    spinner: new Spinner('processing... %s'),
    time: 0,
    start: function () {
        this.time = Date.now();
        this.spinner.start();
        this.spinner.setSpinnerString('|/-\\');
    },
    stop: function () {
        const stopTime = Date.now();
        this.spinner.stop();
        return (stopTime - this.time) / 1000;
    }
};