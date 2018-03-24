'use strict';

module.exports = class Draw {
    constructor(className) {
        this.languages = new Map();
        this.languages.set('bob-svg', 'bob');
        this.languages.set('dot-svg', 'dot');

        const skyrta = require('skyrta');
        this.generator = skyrta;

        this.className = className || this.defaultClassName;
    }

    isValidLanguage(lang) {
        let mapped = this.languages.get(lang);
        return !!mapped;
    }

    render(language, input) {
        let lang = this.languages.get(language);

        if (!lang) {
            throw Error(`Unknown language ${language}`);
        }

        let svg = this.generator.generate(lang, input);
        return `<div class="${this.className} ${this.className}-${lang}">${svg.toEmbed()}</div>`;
    }

    get defaultClassName() {
        return 'remark-draw';
    }

    setGenerator(generator) {
        this.generator = generator;
    }
};