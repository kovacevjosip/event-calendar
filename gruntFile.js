// Grunt module
module.exports = function (grunt) {
    // Load NPM tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-sass');

    // Initialize configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        settings: {
            server: {
                protocol: 'http',
                host: 'localhost',
                port: 3001
            },
            dirs: {
                src: 'src',
                npm: 'node_modules'
            }
        },

        clean: {
            dev: [
                '<%= settings.dirs.src %>/css/**/*'
            ]
        },

        connect: {
            server: {
                options: {
                    debug: true,
                    protocol: '<%= settings.server.protocol %>',
                    hostname: '<%= settings.server.host %>',
                    port: '<%= settings.server.port %>',
                    open: '<%= settings.server.protocol %>://<%= settings.server.host %>:<%= settings.server.port %>'
                }
            }
        },

        concat: {
            deps: {
                src: [
                    '<%= settings.dirs.npm %>/moment/moment.js',
                    '<%= settings.dirs.npm %>/angular/angular.js',
                    '<%= settings.dirs.npm %>/angular-ui-router/release/angular-ui-router.js',
                    '<%= settings.dirs.npm %>/angular-locker/dist/angular-locker.js'
                ],
                dest: '<%= settings.dirs.src %>/js/deps.js'
            },
            app: {
                src: [
                    '<%= settings.dirs.src %>/app/functions/wrapper/_intro.js',
                    '<%= settings.dirs.src %>/app/functions/*.js',
                    '<%= settings.dirs.src %>/app/app.js',
                    '<%= settings.dirs.src %>/app/services/*.js',
                    '<%= settings.dirs.src %>/app/directives/**/*.js',
                    '<%= settings.dirs.src %>/app/components/**/*.js',
                    '<%= settings.dirs.src %>/app/functions/wrapper/_outro.js'
                ],
                dest: '<%= settings.dirs.src %>/js/app.js'
            }
        },

        // JSHint task
        jshint: {
            options: {
                globals: {
                    app: true
                },
                ignores: [
                    '<%= settings.dirs.src %>/app/**/_*.js'
                ]
            },
            files: [
                'gruntFile.js',
                '<%= settings.dirs.src %>/app/**/*.js',
                '!<%= settings.dirs.src %>/app/**/_*.js'
            ]
        },

        sass: {
            // Development
            dev: {
                options: {
                    outputStyle: 'compressed',
                    sourceMap: true,
                    unixNewlines: true,
                    noCache: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= settings.dirs.src %>/scss',
                    src: ['**/*.scss', '!**/_*.scss'],
                    dest: '<%= settings.dirs.src %>/css/',
                    ext: '.css'
                }]
            }
        },

        // Watch task
        watch: {
            options: {
                atBegin: true
            },
            jshint: {
                files: '<%= jshint.files %>',
                tasks: ['jshint']
            },
            remove: {
                files: '<%= settings.dirs.src %>/scss/assets/**',
                tasks: ['clean:dev'],
                options: {
                    event: ['deleted'],
                    atBegin: false
                }
            },
            sass: {
                files: '<%= settings.dirs.src %>/scss/**/*.scss',
                tasks: ['sass:dev'],
                options: {
                    spawn: false
                }
            },
            concat: {
                files: '<%= concat.app.src %>',
                tasks: ['concat:app']
            }
        }
    });

    grunt.registerTask('dev', [
        'concat:deps',
        'concat:app',
        'clean:dev',
        'sass:dev',
        'connect',
        'watch'
    ]);
};