import { defineConfig } from '@rslib/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';


export default defineConfig({
    lib: [
        {
            format: "esm",
            dts: true,
            output: {
                cleanDistPath: false,
                target: "web",
                distPath: {
                    root: "./dist",
                },
                sourceMap: true,
            },
        },
    ],
    plugins: [pluginReact(), pluginSass()],

});