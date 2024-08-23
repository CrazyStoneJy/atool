import { exec } from 'child_process'

async function execShell(shell: string) {
    return new Promise((resolve, reject) => {
        exec(shell, (err, stdout, stderr) => {
            if (err) {
                reject(stderr);
            }
            resolve(stdout);
        });
    });
}

export {
    execShell
}