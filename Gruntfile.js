module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jasmine: {
            assertions: {
                src: 'app/tests/jasmineSpec.js',
                options: {
                    specs: 'app/tests/jasmineSpec.js'
                }
            }
        },
        karma: {
            continuous: {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS'] //'Chrome', 'Firefox', 'PhantomJS'
            }
        },
        wiredep: {
            target: {
                src: [
                    'index.html'
                ],
                cwd: '',
                dependencies: true,
                devDependencies: true,
                exclude: [],
                fileTypes: {},
                ignorePath: '',
                overrides: {}
            }
        },
        htmlhint: {
            angular_files: {
                options: {
                    //https://github.com/yaniswang/HTMLHint/wiki/Rules
                    'tag-pair': true
                },
                src: ['app/modules/*/*/tpl/*.html', 'app/modules/*/*/*/tpl/*.html']
            }
        },
        jshint: {
            options: {
                jshintrc: true
            },
            uses_defaults: ['app/modules/**/*.js']
        },
        less: {
            development: {
                files: {
                    "app/css/main.css": "app/css/main.less"
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'app/css/main.min.css': ['app/css/*.css']
                }
            }
        },
        jscs: {
            src: "app/modules/**/*.js",
            options: {
                config: ".jscsrc",
                //"preset": "crockford",
                requireCurlyBraces: [
                    "if",
                    "else",
                    "while",
                    "for"
                ]
            }
        },
        watch: {
            less: {
                files: ['app/css/*.less'],
                tasks: ['less']
            },
            //jscs: {
            //  files: ['app/modules/**/*.js'],
            //    task: ['jscs']
            //},
            //cssmin: {
            //    files: ['app/css/*.css'],
            //    tasks: ['cssmin']
            //},
            //scripts: {
            //    files: ['app/metronic/*.js'],
            //    tasks: ['jshint']
            //},
            //html: {
            //    files: ['app/modules/*/*/tpl/*.html', 'app/modules/*/*/*/tpl/*.html'],
            //    tasks: ['htmlhint']
            //},
            karma: {
                files: ['app/modules/**/*.js', 'tests/*/*.js'],
                tasks: 'karma'
            }
        },
		connect: {
            dist: {
                options: {
                    port: 1338,
                    hostname: 'localhost',
                    keepalive: true
                }
            }
        }
    });

    // Npm tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-htmlhint');
    grunt.loadNpmTasks("grunt-jscs");

    // My tasks
    grunt.registerTask('hints', ['jshint', 'htmlhint']);
    grunt.registerTask('less-css', ['less', 'cssmin']);
    grunt.registerTask('default', ['connect']);
};