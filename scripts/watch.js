import { spawnSync, spawn, ChildProcess } from 'node:child_process'
import Watcher from 'watcher';
import { writeToIpc, sleep } from './shared.js';
import fkill from 'fkill'

const fileWatcher = new Watcher(['./src', './src-webviews'], { recursive: true, renameDetection: true });
const isWindows = process.platform === "win32";
const altvProcessName = isWindows ? './altv-server.exe' : './altv-server'

/** @type {ChildProcess} */
let childProcess = undefined

async function compiler() {
    console.log(`Starting Compile`)
    const webviewProcess = spawn(isWindows ? 'npx.cmd' : 'npx', ['vite', 'build', './src-webviews'], { stdio: 'inherit' })

    spawnSync('node', ['./scripts/compiler.js'], { stdio: 'inherit' })
    spawnSync('node', ['./scripts/transform.js'], { stdio: 'inherit' })

    await new Promise((resolve) => {
        webviewProcess.on('exit', resolve);
    })

    spawnSync('node', ['./scripts/copy.js'], { stdio: 'inherit' })
    console.log(`Compile Complete`)
}

async function reboot() {
    writeToIpc('kick-all');
    await sleep(250);
    if (childProcess) {
        await fkill(':7788')

        if (!childProcess.killed) {
            try {
                childProcess.kill();
            } catch (err) { }
        }
    }

    await compiler();
    childProcess = spawn(altvProcessName, { stdio: 'inherit' })
}

function start() {
    fileWatcher.on('change', reboot);
    reboot();
}

start();
