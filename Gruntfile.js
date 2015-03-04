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

    var cssFiles = [
        './app/app.css',
        './app/openBox/*.css',
        './app/productSearch/*.css',
        './app/recommendations/*.css',
        './app/smartLists/*.css',                    
        './app/stores/*.css',        
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
            },
        },
        concat_css: {
            all: {
                src: cssFiles,
                dest: './app/production.css'
            }
        },
        watch: {
            scripts: {
                files: jsFiles,
                tasks: ["concat:scripts","concat:styles"]
            },
            styles: {
                files: cssFiles,
                tasks: ["concat_css:all"]
            },
        },
        concurrent: {
            target: {
                tasks: ['run:target','watch:scripts','watch:styles'],
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