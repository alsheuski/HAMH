const jsdom = require('jsdom');

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

module.exports = {
    getAllLinkElements: (markup) => parse(markup, 'a'),
    getAllButtonsElements: (markup) => parse(markup, 'button'),
};