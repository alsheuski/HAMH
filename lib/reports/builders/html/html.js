const nunjucks = require('nunjucks');

module.exports = {
    createHtml: (data) => {
        const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(__dirname + '/templates/base-html-css-1'));
        const template = env.getTemplate('base-html-css-1.html.njk');

        return template.render({ data });
    }
};