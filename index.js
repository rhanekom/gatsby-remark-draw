'use strict';

const visit = require('unist-util-visit');
const SupportedLanguages = require('./lib/supportedlanguages');
const PipedProcess = require('./lib/pipedprocess.js');

module.exports = ({ markdownAST }) => {
    const languages = new SupportedLanguages();

    visit(markdownAST, 'code', node => {
        let lang = node.lang;
        let executable = languages.getCommand(lang);

        if (!executable) {
            return;
        }
        
        const pipedprocess = new PipedProcess();

        let svg;

        try {      
            svg = pipedprocess.run(executable.exec, executable.args, node.value);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error(`Unable to render ${lang} graph: ${e}`);
            return;
        }

        node.type = 'html';
        node.value = svg;
    });
};
