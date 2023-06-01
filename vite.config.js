import { defineConfig, normalizePath } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, extname } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { v4 as uuid } from 'uuid';
import fs from 'fs';

const getStaticResources = () => {
    const publicDir = resolve(__dirname, 'app-dist/dist/assets');
    const staticFiles = fs.readdirSync(publicDir).filter((file) => {
        const ext = extname(file);
        return ext !== '.js';
    });

    return staticFiles.map((file) => `/app-dist/dist/assets/${file}`);
};

const generateServiceWorker = () => {
    const STATIC_RESOURCES = getStaticResources();

    const swCode = fs.readFileSync(resolve(__dirname, 'app-dist/dist/sw.js'), 'utf-8')
        .replace('const STATIC_RESOURCES = [];', `const STATIC_RESOURCES = ${JSON.stringify(STATIC_RESOURCES)};`);

    fs.writeFileSync(resolve(__dirname, 'app-dist/dist/sw.js'), swCode, 'utf-8');
};

const replaceHash = () => {
    const swCode = fs.readFileSync(resolve(__dirname, 'app-dist/dist/sw.js'), 'utf-8')
        .replace(
            'const CACHE_NAME = \'static-cache-v1\';', `const CACHE_NAME = 'static-cache-${uuid()}';`
        );

    fs.writeFileSync(resolve(__dirname, 'app-dist/dist/sw.js'), swCode, 'utf-8');
};

export default defineConfig({
    resolve: {
        alias: {
            '~@ibm/plex': resolve(__dirname, 'node_modules/@ibm/plex')
        }
    },
    plugins: [react(),
        viteStaticCopy({
            targets: [
                {
                    src: normalizePath(resolve(__dirname, 'public/template')),
                    dest: normalizePath(resolve(__dirname, 'app-dist/dist'))
                },
                {
                    src: normalizePath(resolve(__dirname, 'public/js/sw.js')),
                    dest: normalizePath(resolve(__dirname, 'app-dist/dist/'))
                }
            ]
        }),
        {
            name: 'postbuild-commands',
            closeBundle: async () => {
                try {
                    await generateServiceWorker();
                    await replaceHash();
                } catch (e) {
                    console.error(e);
                }
            }
        }],
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
        sourcemap: process.env.NODE_ENV === 'development' ? true : false,
        minify: false
    },
    base: '/app-dist/dist'
});

