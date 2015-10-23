/*
    see:
        http://karma-runner.github.io/0.13/config/configuration-file.html
        https://github.com/webpack/karma-webpack/tree/master/example
 */


module.exports = function makeKarmaConfig (opts) {
    var __INTEGRATION__ = Boolean(opts.__INTEGRATION__);
    var __COVERAGE__    = Boolean(opts.__COVERAGE__);

    var entryFile;

    if (__INTEGRATION__)
        entryFile = 'browser_client/__test__/integration/index.js';
    else if (__COVERAGE__)
        entryFile = 'browser_client/__test__/coverage.js';
    else
        entryFile = 'browser_client/__test__/index.js';

    var reportSlowerThan = (__INTEGRATION__ || __COVERAGE__) ? 750 : 150;

    var config = {
        basePath: '',
        reportSlowerThan: reportSlowerThan,
        frameworks: [ 'mocha', 'chai', 'sinon' ],
        reporters: [ 'dots' ],
        browsers: [ 'Chrome' ],
        client: { useIframe: false },
        files: [ entryFile ],
        preprocessors: { 'browser_client/**/*': [ 'webpack', 'sourcemap' ] },
    };

    if (__COVERAGE__)
        return Object.assign({}, config, {
            reporters: [ 'dots', 'coverage' ],
            coverageReporter: {
                dir:  'coverage/',
                type: 'html'
            },
            webpack: require('./webpack.coverage'),
            webpackMiddleware: { noInfo: true },
        });
    else
        return Object.assign({}, config, {
            webpack: require('./webpack.test'),
            webpackMiddleware: { noInfo: true },
        });
}
