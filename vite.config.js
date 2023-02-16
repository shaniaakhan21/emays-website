import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react()],
    root: resolve(__dirname, 'public'),
    build: {
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

