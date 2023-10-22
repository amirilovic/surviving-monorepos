import { defineConfig } from 'tsup'
import path from 'path'
import fs from 'fs'
import {
    getPackageInfos,
    getWorkspaceRoot,
} from "workspace-tools";
import { sassPlugin, postcssModules } from 'esbuild-sass-plugin'

function getWatchPaths(packageJsonPath) {
    const projectRoot = getWorkspaceRoot(packageJsonPath);
    const packageInfos = getPackageInfos(projectRoot);
    const packageNames = new Set(Object.keys(packageInfos));
    const packageDependencies = Object.keys(JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')).dependencies || {});

    const distDirs = packageDependencies.filter((dependency) => packageNames.has(dependency)).map((dependency) => {
        const dependencyPackageJsonPath = packageInfos[dependency].packageJsonPath;
        return path.resolve(path.dirname(dependencyPackageJsonPath), 'dist', '**');
    });

    const srcPath = path.resolve(path.dirname(packageJsonPath), 'src', '**');

    return [...distDirs, srcPath];
}

export default defineConfig(() => {

    let pathsToWatch = false;

    // Watch all dist folders from workspace dependencies
    if (process.env.TSUP_WATCH_WORKSPACE === 'true') {
        pathsToWatch = getWatchPaths(packageJsonPath);
        pathsToWatch.push(srcPath);
    }

    return {
        entry: ['src/index.ts'],
        splitting: true,
        sourcemap: true,
        clean: false,
        dts: true,
        format: ['esm'],
        watch: pathsToWatch,
        esbuildPlugins: [
            sassPlugin({
                filter: /\.module\.scss$/,
                transform: postcssModules({
                    basedir: path.resolve('./src'),
                })
            }),
            sassPlugin({
                filter: /\.scss$/
            }),
        ],
    }
})