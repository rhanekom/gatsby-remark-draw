const Draw = require('../../lib/draw');

let draw = new Draw();
draw.setGenerator({
    generate: function(lang, input, options) {
        return { 'toEmbed': () => input, 'options': options };
    },
});

const testString = '----->';

test('render wraps output in div', () => {    
    let test = new RegExp(`<div(.*)>${testString}</div>$`);
    expect(draw.render('bob-svg', testString)).toMatch (test);
});

test('render div wrapper contains default class', () => {    
    let test = new RegExp(`class="${draw.defaultClassName}(.*)"`);
    expect(draw.render('bob-svg', testString)).toMatch (test);
});

test('render div wrapper contains exec class', () => {    
    let test = new RegExp(`class="(.*)${draw.defaultClassName}-bob(.*)?"`);
    expect(draw.render('bob-svg', testString)).toMatch (test);
});

test('render throws error if unknown language', () => {    
    expect(() => draw.render('unknown', testString)).toThrowError('Unknown');
});

test('isValidLanguage returns true for known language', () => {
    expect(draw.isValidLanguage('bob-svg', testString)).toBeTruthy();
});

test('isValidLanguage returns true for known language', () => {
    expect(draw.isValidLanguage('unkown', testString)).toBeFalsy();
});

test('draw passes options to generator', () => {
    let captureDraw = new Draw();
    let capturedOptions = null;

    captureDraw.setGenerator({
        generate: function(lang, input, options) {
            capturedOptions = options;                
            return { 'toEmbed': () => input };
        }
    });

    let svgOptions = { 'draw': 1 };
    
    captureDraw.render('bob-svg', '----->', { 
        plugins: [], 'bob': svgOptions
    });

    expect(capturedOptions).toBe(svgOptions);
});
