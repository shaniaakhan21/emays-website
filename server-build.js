const Parcel = require('@parcel/core').default;

const UI_VERSION = process.env.APP_VERSION;
console.log(`Starting Parcel Build for UI-V:${UI_VERSION} ...`);
const options = {
    // TODO: delete testharness.html from here
    entries: ['./public/index.html', './public/testharness.html'],
    defaultConfig: require.resolve('@parcel/config-default'),
    mode: 'production',
    defaultTargetOptions: {
        /*
         * Since we have mentioned the dist folder as the static,
         * template location in the app.js, here it gives absolute path to generate 
         * file relationship
         */
        publicUrl: `/emays/app-dist/dist/${UI_VERSION}`,
        sourceMaps: false,
        distDir: `./app-dist/dist/${UI_VERSION}`,
        engines: {
            browsers: ['> 0.5%', 'last 2 versions', 'not dead']
        }
    },
    env: {
        NODE_ENV: 'production'
    },
    shouldDisableCache: true,
    minify: true,
    shouldAutoInstall: true
};

new Parcel(options).run().then(({ bundleGraph, buildTime }) => {
    let bundles = bundleGraph.getBundles();
    console.log(`✨ Built ${bundles.length} bundles in ${buildTime}ms!`);
}).catch(err => {
    console.error('Parcel Bundler Error: ', err.diagnostics);
});
