"use strict";

const visit = require('unist-util-visit')

module.exports = ({ markdownAST }, { language = 'bob-svg' } = {}) => {
  visit(markdownAST, 'code', node => {
    let lang = (node.lang || '').toLowerCase()

    let supportedLanguages = new Map();
    supportedLanguages
      .set('bob-svg', { exec: 'svgbob', args: []})
      .set('dot-svg', { exec: 'dot', args: ['-Tsvg']});

    let executable = supportedLanguages.get(lang);

    if (!executable) {
      return;
    }

    const PipedProcess = require("./lib/pipedprocess.js");
    const pipedprocess = new PipedProcess();

    let svg;

    try {
      svg = pipedprocess.run(executable.exec, executable.args, node.value);
    } catch (e) {
      console.error(`Unable to render ${lang} graph: ${e}`);
      return;
    }

    node.type = 'html'
    node.value = svg;
  });
}
