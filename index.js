'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const visit = require('unist-util-visit');
const Draw = require('./lib/draw');
const DEPLOY_DIR = 'public';


module.exports = ({ markdownAST, pathPrefix }, pluginOptions = {}) => {  

    visit(markdownAST, 'code', (node, index, parent) => {
        let draw = new Draw();
        let lang = node.lang || '';

        if (!draw.isValidLanguage(lang)) {
            return;
        }
        
        try {

            if (pluginOptions.strategy === 'img') {
                let svg = draw.render(lang, node.value, pluginOptions);
                
                const hash = crypto.createHmac('sha1', 'gatsby-remark-draw').update(svg.value).digest('hex');
                const fileName = `${hash}.svg`;
                const fullPath = path.join(DEPLOY_DIR, fileName);
                fs.writeFileSync(fullPath, svg.value);

                const image = {
                    type: 'image',
                    title: 'remark-draw image',
                    url: path.join('/', pathPrefix, fileName)
                };
              
                parent.children.splice(index, 1, image);
            }
            else {
                let svg = draw.renderWrapped(lang, node.value, pluginOptions);
                node.type = 'html';
                node.value = svg;               
            }
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error(`Unhandled exception in rendering: ${e}`);            
        }
    });
};
