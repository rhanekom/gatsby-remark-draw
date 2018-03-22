const SupportedLanguages = require('../../lib/supportedlanguages');

test('getCommand has correct executable for bobsvg', () => {
    const languages = new SupportedLanguages();    
    expect(languages.getCommand(SupportedLanguages.langBob())).toHaveProperty('exec', 'svgbob');
});

test('getCommand has correct executable for dot', () => {
    const languages = new SupportedLanguages();    
    const cmd = languages.getCommand(SupportedLanguages.langDot());    
    expect(cmd.exec).toBe('dot');

    // Important that we specify output to SVG as this not the default
    expect(cmd.args).toContain('-Tsvg');
});

test('getCommand performs normalizes case', () => {
    const languages = new SupportedLanguages();    
    expect(languages.getCommand(SupportedLanguages.langDot().toUpperCase())).toHaveProperty('exec', 'dot');
});

test('getCommand returns undefined on language not found', () => {
    const languages = new SupportedLanguages();    
    expect(languages.getCommand('gibberish')).toBeUndefined();
});

test('getCommand returns undefined if language is not specified', () => {
    const languages = new SupportedLanguages();    
    expect(languages.getCommand(null)).toBeUndefined();
    expect(languages.getCommand(undefined)).toBeUndefined();
    expect(languages.getCommand('')).toBeUndefined();
});