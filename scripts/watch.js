
import { spawnSync, spawn, ChildProcess } from 'node:child_process'
import Watcher from 'watcher';
import { writeToIpc, sleep } from './shared.js';

const fileWatcher = new Watcher(['./src', './src-webviews'], { recursive: true, renameDetection: true });
const isWindows = process.platform === "win32";
const altvProcessName = isWindows ? './altv-server.exe' : './altv-server'

/** @type {ChildProcess} */
let childProcess = undefined
let rebootDebounce = Date.now() + 0;

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
    if (rebootDebounce > Date.now()) {
        return;
    }

    rebootDebounce = Date.now() + 1000;
    writeToIpc('kick-all');
    await sleep(250);
    if (childProcess) {
        try {
            childProcess.kill();
        } catch (err) { }

        await new Promise((resolve) => {
            const interval = setInterval(() => {
                if (!childProcess.killed) {
                    childProcess.kill();
                    return;
                }

                childProcess = undefined
                clearInterval(interval);
                resolve();
            }, 100);
        })
    }

    await compiler();
    childProcess = spawn(altvProcessName, { stdio: 'inherit' })
}

function start() {
    fileWatcher.on('change', reboot);
    reboot();
}

start();