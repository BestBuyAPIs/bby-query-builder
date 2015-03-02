module.exports = function (grunt) {

    grunt.initConfig({
        'http-server': {
            'dev': {
                port: 8000,
                runInBackground: true
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        concat: {
            dist: {
                src: [ 
                    './app/app.js',
                    './app/appConstants/*.js',
                    './app/appServices/*.js',
                    './app/openBox/*.js',
                    './app/productSearch/*.js',
                    './app/recommendations/*.js',
                    './app/smartLists/*.js',                    
                    './app/stores/*.js',
                ],
            dest: './app/production.js',
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-bower-concat');

    grunt.registerTask('test', [
        'karma'
    ]);

};