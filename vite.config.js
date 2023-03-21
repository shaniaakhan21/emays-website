import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    resolve: {
        alias: {
            '~@ibm/plex': resolve(__dirname, 'node_modules/@ibm/plex')
        }
    },
    plugins: [react(),
        viteStaticCopy({
            targets: [
                { src: resolve(__dirname, 'public/template'), dest: resolve(__dirname, 'app-dist/dist') }
            ]
        })],
    root: resolve(__dirname, 'public'),
    build: {
        chunkSizeWarningLimit: 3000,
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'public/index.html'),
                test: resolve(__dirname, 'public/testharness.html')
            }
        },
        outDir: resolve(__dirname, 'app-dist/dist'),
        emptyOutDir: true,
        sourcemap: process.env.NODE_ENV === 'development' ? true : false
    },
    base: '/app-dist/dist'
});

