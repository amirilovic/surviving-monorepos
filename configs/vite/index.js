const { defineConfig } = require('vitest/config');
const { onSuccess } = require('./vite-on-success-plugin');
const react = require('@vitejs/plugin-react')
const { checker } = require('vite-plugin-checker')

module.exports = defineConfig({
    test: {
        globals: true,
        watch: false,
        environment: 'node'
    },
    build: {
        ssr: true,
        sourcemap: true,
        lib: {
            entry: 'src/index.ts',
            formats: ['es'],
            fileName: 'index'
        }
    },
    plugins: [  checker({ typescript: true }), react(), onSuccess()]
});
