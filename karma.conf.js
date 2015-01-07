'use strict';

module.exports = function (config) {
    config.set({
        basePath: './',
        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/**/*.js',
            {pattern: 'app/bower_components/**/*.js', watched: false, included: false, served: true}

        ],
        exclude: [
            'app/bower_components/bootstrap/**',
            'app/bower_components/jquery/**',
        ],
        autoWatch: true,
        frameworks: [
            'jasmine'
        ],
        browsers: [
            'PhantomJS'
        ],
        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],
        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    });
};