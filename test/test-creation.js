/*global describe, beforeEach, it, __dirname*/
(function() {
    "use strict";

    var path = require('path');
    var helpers = require('yeoman-generator').test;


    describe('openui5 app generator', function() {
        beforeEach(function(done) {
            helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
                if (err) {
                    return done(err);
                }

                this.app = helpers.createGenerator('openui5:app', [
                    '../../app',
                    '../../view'
                ]);

                this.mockPrompts = {
                    applicationName: 'My Application',
                    appDescription: 'Test Description',
                    authorName: 'John Doe',
                    gitRepository: 'ssh://github.com/ropository/url.git',
                    licenseType: 'Apache License, Version 2.0',
                    features: ""
                };

                this.expected = [
                    'css/style.css',
                    'ext/.gitkeep',
                    'test/.gitkeep',
                    'i18n/messageBundle.properties',
                    'img/.gitkeep',
                    'model/Config.js',
                    'model/img.json',
                    'util/.gitkeep',
                    'index.html',
                    'Gruntfile.js',
                    '.jshintrc',
                    'bower.json',
                    'package.json',
                    'README.md',
                    'view/Main.controller.js',
                    'view/Main.view.js',
                    'Application.js'
                ];

                done();
            }.bind(this));
        });



        it('creates expected files with args', function(done) {
            helpers.mockPrompt(this.app, this.mockPrompts);

            var expected = this.expected;

            this.app.args = ['view.Main', false];
            this.app.options['skip-install'] = true;
            this.app.run({}, function() {
                helpers.assertFiles(expected);
                done();
            });
        });
    });

    describe("openui5 view generator", function() {
        beforeEach(function(done) {
            //helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
            //  if (err) {
            //      return done(err);
            //  }

                this.view = helpers.createGenerator("openui5:view", [
                    "../../view"
                ]);

                done();
            //}.bind(this));
        });

        it("creates expected files with args", function(done) {
            var expected = [
                    "view/Test.controller.js",
                    "view/Test.view.xml"
                ];

            helpers.mockPrompt(this.view, {
                viewName: "Test",
                features: ["xmlView"]
            });
            this.view.run({}, function() {
                helpers.assertFiles(expected);
                done();
            });
        });
    });
}());