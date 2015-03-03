module.exports = function (grunt) {


    var jsFiles = [ 
        './app/app.js',
        './app/appConstants/*.js',
        './app/appServices/*.js',
        './app/openBox/*.js',
        './app/productSearch/*.js',
        './app/recommendations/*.js',
        './app/smartLists/*.js',                    
        './app/stores/*.js',
    ];

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
            scripts:{            
                dist: {
                    src: jsFiles,
                dest: './app/production.js',
            }
        }
        },
        watch: {
            scripts: {
                files: jsFiles,
                tasks: ["concat:scripts"]
            }
        },
        concurrent: {
            target: {
                tasks: ['run:target','watch:scripts'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        run: {
            target: {
                exec: "http-server -a localhost -p 8000 -c-1",
                args: []
            },
            options: {
                spawn: false,
            }
        },
    });

    require('load-grunt-tasks')(grunt);
    
    grunt.registerTask('test', [
        'karma'
    ]);

};