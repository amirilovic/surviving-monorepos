import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import { checker } from 'vite-plugin-checker'
import dts from 'vite-plugin-dts'

export default defineConfig({
    test: {
        globals: true,
        watch: false,
        environment: 'node',
        include: ['src/**/*.spec.ts', 'src/**/*.spec.tsx'],
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
    plugins: [!process.env.VITEST ? checker({ typescript: true }) : undefined, dts(), react()]
});