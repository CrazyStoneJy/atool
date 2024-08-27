import { exec } from 'child_process'

async function execShell(shell: string): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(shell, (err, stdout, stderr) => {
            if (err) {
                reject(stderr);
            }
            resolve(stdout);
        });
    });
}

export interface DiffResult {
    isSame: boolean
    sha256: string
}

function diff(apkSign: string, jksCert: string): DiffResult {
    // console.log("🚀 ~ diff ~ apkCert:", apkSign)
    // console.log("🚀 ~ diff ~ jksCert:", jksCert)
    const apkSignSha256 = getSha256FromApkSign(apkSign)
    const sha256 = getSHA256FromJksCert(jksCert)
    return {
        isSame: apkSignSha256 === sha256,
        sha256
    }
}

function getSha256FromApkSign(apkSign: string): string {
    const array: string[] = apkSign.split('\n')
    let sha256Line = ''
    array.forEach((item: string, index: number) => {
        if (item.indexOf('certificate SHA-256 digest') >= 0) {
            // console.log("🚀 ~ SHA256:", item)
            sha256Line = item
            return
        }
    })
    // console.log("🚀 ~ getSha256FromApkSign ~ sha256Line:", sha256Line)
    const sha256Array = sha256Line.trim().split(':')
    const sha256Raw = sha256Array[1].trim()
    // console.log("🚀 ~ getSha256FromApkSign ~ sha256Raw:", sha256Raw)
    return sha256Raw.toLocaleLowerCase()
}

function getSHA256FromJksCert(jksCert: string): string {
    const array: string[] = jksCert.split('\n')
    let sha256Line = ''
    array.forEach((item: string, index: number) => {
        if (item.indexOf('SHA256:') >= 0) {
            // console.log("🚀 ~ SHA256:", item)
            sha256Line = item
            return
        }
    })
    const sha256Array = sha256Line.trim().split(' ')
    const sha256Raw = sha256Array[1]
    const sha256 = sha256Raw.split(':').reduce((perv: string, cur: string) => perv.toLocaleLowerCase() + cur.toLocaleLowerCase())
    // console.log("🚀 ~ getSHA256FromJksCert ~ sha256:", sha256)
    return sha256
}   



export {
    execShell,
    diff
}