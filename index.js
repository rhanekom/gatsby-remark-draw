'use strict';

const visit = require('unist-util-visit');
const Draw = require('./lib/draw');


module.exports = ({ markdownAST }, pluginOptions = {}) => {  
    visit(markdownAST, 'code', node => {
        let draw = new Draw();
        let lang = node.lang || '';

        if (!draw.isValidLanguage(lang)) {
            return;
        }

        try {            
            let svg = draw.render(lang, node.value, pluginOptions);
            node.type = 'html';
            node.value = svg;
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error(`Unhandled exception in rendering: ${e}`);            
        }
    });
};
