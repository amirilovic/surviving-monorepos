const kill = require('tree-kill');
const createDebug = require('debug');

const debug = createDebug('vite:on-success');

const killProcess = ({
    pid,
    signal = 'SIGTERM',
}) =>
    new Promise((resolve) => {
        kill(pid, signal, resolve)
    })


function onSuccess({ command = process.env.VITE_ON_SUCCESS } = {}) {

    debug('command: ', command);

    let onSuccessProcess;

    const doOnSuccessCleanup = async () => {
        if (onSuccessProcess) {
            await killProcess({
                pid: onSuccessProcess.pid,
            })
        }
        onSuccessProcess = undefined
    }

    async function run() {
        await doOnSuccessCleanup();

        debug('running command: ', command);

        const { execa } = await import('execa');

        onSuccessProcess = execa(command, {
            shell: true,
            stdio: 'inherit',
        })

        onSuccessProcess.on('exit', (code) => {
            if (code && code !== 0) {
                process.exitCode = code
            }
        })
    }

    return {
        name: "vite:on-success",
        closeBundle: async () => {
            if (!command) {
                return;
            }
            await run()
        }
    }
}

module.exports = {
    onSuccess
}