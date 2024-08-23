#!/usr/bin/env node

import { Command } from 'commander';
import { execShell } from './utils';

const program = new Command();

program.name('asigner')
    .description('CLI sign android application')
    .version(`${require('../package.json').version}`, '-v --version');


program.command('sign')
    .description('sign apk')
    .option('-j --jks <keystore>')
    .option('-a --alias <keystore alias>')
    .option('-o --out <output apk>')
    .option('-i --in <input apk>')
    .option('-p --keyPass <keystore password>')
    .action((options) => {
        const i = options.in
        const o = options.out
        const alias = options.alias
        const jks = options.jks
        const p = options.keyPass
        const command = `sh ./apksigner sign --verbose --ks ${jks} --ks-pass pass:${p} --ks-key-alias ${alias} --out ${o} --in ${i}`
        console.log("🚀 ~ .action ~ command:", command)
        execShell(command)
            .then((res) => {
                console.log("sign result: \n", res)
            }).catch((error) => {
                console.log("🚀 ~ execShell ~ error:", error)
            })
    })

program.command('verify')
    .description('verify apk')
    .argument('<apk file>', 'path of apk')
    .action((apkFile, options) => {
        const command = `sh ./apksigner verify --verbose --print-certs ${apkFile}`
        execShell(command)
            .then((res) => {
                console.log("verify result: \n", res)
            }).catch(() => {
                // console.log("🚀 ~ execShell ~ error:", error)
            })
    })

program.command('look')
    .description('get jsk private secret')
    .argument('<path of jks>', 'path of jks')
    .option('-p --storepass <password of keystore>')
    .action((jks, options) => {
        const storepass = options.storepass
        let command = `keytool -list -v -keystore ${jks}`
        if (storepass) {
            command += ` -storepass ${storepass} -storetype PKCS12`
        }
        console.log("🚀 ~ .action ~ command:", command)
        execShell(command).then((res) => {
            console.log("private secret result: \n", res)
        })
    })


program.command('extract')
.description('extract app bundle to apk')
.option('-aab --aab <path of aab>')
.option('-o --output <output path of apks>')
.option('-j --jks <keystore>')
.option('-a --alias <keystore alias>')
.option('-k --keystorePass <keystore password>')
.option('-p --keyPass <key password alias>')
.action(async(options) => {
    const aab = options.aab
    const o: string = options.output
    const j = options.jks
    const a = options.alias
    const k = options.keystorePass
    const p = options.keyPass
    let command = `java -jar ./bundletool-all-1.17.1.jar  build-apks --bundle=${aab} --output=${o} --mode=universal --ks=${j} --ks-pass=pass:${k} --ks-key-alias=${a} --key-pass=pass:${p}`
    console.log("🚀 ~ .action ~ command:", command)
    const res = await execShell(command)
    console.log("command result: \n", res + 'successfully')
    const zipPath = o.replace('.apks', '.zip')
    console.log("🚀 ~ execShell ~ zipPath:", zipPath)
    const renameCommand = `mv ${o} ${zipPath}`
    const rename = await execShell(renameCommand)
    console.log("🚀 ~ .action ~ rename successfully")
    const outputZipPath = zipPath.substring(0, zipPath.length - 4)
    const unzipCommand = `unzip ${zipPath} -d ${outputZipPath}`
    console.log("🚀 ~ .action ~ unzipCommand:", unzipCommand)
    const unzip = await execShell(unzipCommand).catch((zerror) => {
        console.log("🚀 ~ .action ~ zerror:", zerror)
    })
    console.log("🚀 ~ .action ~ unzip successfully")
})    

program.parse(process.argv);
