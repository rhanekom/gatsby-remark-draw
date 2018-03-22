const PipedProcess = require('../../lib/pipedprocess');
const testString = 'hello 456 ""';
const cat = "cat";

test('execute passes input and returns output', () => {    
    expect(simpleCat()).toBe(testString);
});

test('execute passes parameters', () => {    
    // Execute cat with the line numbers option
    let output = execute(cat, ['-n'], testString);

    /*  Whitespace
     *  followed by line number (1)
     *  followed by whitespace
     *  followed by test string */
    let test = new RegExp(`[\\s\\S]*1[\\s\\S]*${testString}$`);
    expect(output).toMatch (test);
});

test('execute throws error when exec provides non zero code', () => {
    // Execute cat with an arbitrary option
    expect(() => execute(cat, ['-kj3'], testString)).toThrowError('Non-0 status code');
});

test('execute includes stderr when exec provides non zero code', () => {
    // Execute cat with an arbitrary option
    expect(() => execute(cat, ['-kj3'], testString)).toThrowError('invalid option');
});

test('run wraps output in div', () => {    
    let test = new RegExp(`<div(.*)>${testString}</div>$`);
    expect(run(cat, [], testString)).toMatch (test);
});

test('run div wrapper contains default class', () => {    
    let test = new RegExp(`class="${PipedProcess.defaultClassName()}(.*)"`);
    expect(run(cat, [], testString)).toMatch (test);
});

test('run div wrapper contains exec class', () => {    
    let test = new RegExp(`class="(.*)${PipedProcess.defaultClassName()}-cat(.*)?"`);
    expect(run(cat, [], testString)).toMatch (test);
});


function simpleCat() {
    // Simple cat with input written by this process
    return execute(cat, [], testString);    
}

function execute(cmd, parameters, input) {    
    return new PipedProcess().execute(cmd, parameters, input);
}

function run(cmd, parameters, input) {    
    return new PipedProcess().run(cmd, parameters, input);
}

