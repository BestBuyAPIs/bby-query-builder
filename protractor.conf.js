'use strict';

exports.config = {
    allScriptsTimeout: 11000,

    specs: [
        'e2e-tests/*.js'
    ],

    capabilities: {
        'browserName': 'chrome'
    },
    
    baseUrl: 'http://localhost:8000/app/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};
