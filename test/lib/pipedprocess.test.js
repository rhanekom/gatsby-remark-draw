const PipedProcess = require('../../lib/pipedprocess');
const testString = "hello 123 ''";

test('execute returns passes input', () => {
    let process = new PipedProcess();
    expect(process.execute('cat', [], testString)).toBe(testString);
});