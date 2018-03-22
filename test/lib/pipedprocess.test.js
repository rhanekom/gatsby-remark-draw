const PipedProcess = require('../../lib/pipedprocess');
const testString = "hello 456 ''";

test("execute passes input and returns output", () => {
    let process = new PipedProcess();
    expect(process.execute('cat', [], testString)).toBe(testString);
});

test("execute passes parameters", () => {
    let process = new PipedProcess();
    let output = process.execute("cat", ["-n"], testString);

    /*  Whitespace
     *  followed by line number (1)
     *  followed by whitespace
     *  followed by test string */
    let test = new RegExp(`[\\s\\S]*1[\\s\\S]*${testString}$`);
    expect(output).toMatch (test);
});