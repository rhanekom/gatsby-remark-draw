'use strict';

module.exports = class SupportedLanguages {
    constructor() {
        this.supportedLanguages = new Map();
        this.supportedLanguages
            .set(SupportedLanguages.langBob(), { exec: 'svgbob', args: []})
            .set(SupportedLanguages.langDot(), { exec: 'dot', args: ['-Tsvg']});
    }

    getCommand(language) {
        let lang = (language || '').toLowerCase();
        return this.supportedLanguages.get(lang);
    }   

    static langDot() {
        return 'dot-svg';
    }

    static langBob() {
        return 'bob-svg';
    }
};
