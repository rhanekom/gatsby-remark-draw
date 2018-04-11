'use strict';

module.exports = class Draw {
    constructor(className) {
        this.languages = new Map();
        this.languages.set('bob-svg', 'bob');
        this.languages.set('dot-svg', 'dot');
        this.languages.set('mermaid-svg', 'mermaid');

        const skyrta = require('skyrta');
        this.generator = skyrta;

        this.className = className || this.defaultClassName;
    }

    isValidLanguage(lang) {
        let mapped = this.languages.get(lang);
        return !!mapped;
    }

    renderWrapped(language, input, pluginOptions = {}) {
        let svg = this.render(language, input, pluginOptions);
        
        let lang = this.languages.get(language);
        return `<div class="${this.className} ${this.className}-${lang}">${svg.toEmbed()}</div>`;
    } 


    render(language, input, pluginOptions = {}) {
        let lang = this.languages.get(language);
        
        if (!lang) {
            throw Error(`Unknown language ${language}`);
        }

        let langOptions = pluginOptions[lang] || {};
        return this.generator.generate(lang, input, langOptions);
    } 

    get defaultClassName() {
        return 'remark-draw';
    }

    setGenerator(generator) {
        this.generator = generator;
    }
};