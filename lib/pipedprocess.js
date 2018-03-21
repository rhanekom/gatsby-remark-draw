"use strict";

module.exports = class PipedProcess {
    async run(cmd, args, input) {
        let output = await this.execute(cmd, args, input);
        return `<div class="remark-draw-${cmd}">${output}</div>`;
    }

    execute(cmd, args, input) {
        return new Promise(function(resolve, reject) {
            const process = require('child_process');
            let stdout = "", stderr = "";
            
            const p = process.spawn(cmd, args || [], {
                detached: false,
                stdio: "pipe"
            });
            
            p.stdout.on("data", data => stdout += data);
            p.stderr.on("data", data => stderr += data);

            p.on("exit", (code, signal) => {
                if (code === 0) {
                  resolve(stdout);
                } else {
                  reject(stderr);
                }
            });

            p.stdin.write(input);
            p.stdin.end(); 
        });
    };
};
