const jsdom = require('jsdom');
const rgx = require('./parsers/regex');

function parse(markup, selector) {
    const dom = new jsdom.JSDOM(markup);
    const document = dom.window.document;
    const elements = document.querySelectorAll(selector);
    const elementsList = [...elements];

    return elementsList.map(item => {
        const wrapper = document.createElement('div');
        wrapper.appendChild(item.cloneNode(true));

        return wrapper.innerHTML;
    });
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#039;'
    };

    return text.replace(/[&<>"']/g, function (m) {
        return map[m];
    });
}

module.exports = {
    getAllStyleFiles: (markup) => parse(markup, 'link'),
    getAllLinkElements: (markup) => parse(markup, 'a'),
    getAllButtonsElements: (markup) => parse(markup, 'button'),
    escapeHtml: (html) => escapeHtml(html),
    findInLine: (fileContent, pattern) => rgx.findInLine(fileContent, pattern)
};