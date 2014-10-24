'use strict';

exports.config = {
    allScriptsTimeout: 11000,

    //seleniumServerJar: './lib/selenium-server-standalone-2.39.0.jar',

    specs: [
        'e2e-tests/*.js'
    ],

    capabilities: {
        'browserName': 'phantomjs',
        'phantomjs.binary.path': require('phantomjs').path
    },

    baseUrl: 'http://localhost:8000/app/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};
