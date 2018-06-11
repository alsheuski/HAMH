const parser = require('../../../parser');
const nunjucks = require('nunjucks');

function createList(tag, text) {
    if (typeof text === 'string') {
        return `<${tag}><li>${text}</li></${tag}>`;
    }

    const result = text.map(item => {
        return `<li>${parser.escapeHtml(item)}</li>`
    });

    return `<${tag}>${result.join('')}</${tag}>`
}


module.exports = {
    createHtml: (data) => {
        const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(__dirname + '/templates'));
        const template = env.getTemplate('base-html-css-1.html.njk');

        return template.render({ foo: 'bar' });

        // // TODO: rewrite it to use nunjucks
        // return data.map(item => {
        //     switch (item.tag) {
        //         case 'h3':
        //             return `<h3>${item.text}</h3>`;
        //         case 'ol':
        //         case 'ul':
        //             return createList(item.tag, item.text);
        //         default:
        //             console.log(`[HTML Builder] Unknown tag: ${item.tag}!`);
        //             return;
        //     }
        // }).join('')
    }
};