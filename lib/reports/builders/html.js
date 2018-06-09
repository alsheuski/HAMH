const parser = require('../../parser');

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
        // TODO: rewrite it to use nunjucks
        return data.map(item => {
            switch (item.tag) {
                case 'h3':
                    return `<h3>${item.text}</h3>`;
                case 'ol':
                case 'ul':
                    return createList(item.tag, item.text);
                default:
                    console.log(`[HTML Builder] Unknown tag: ${item.tag}!`);
                    return;
            }
        }).join('')
    }
};