( function() {
    /* global __dirname, require, module */
    "use strict";
    var util = require( "util" );
    var path = require( "path" );
    var ScriptBase = require( "../script-base.js" );

    /*jshint unused: vars */
    var openui5Generator = module.exports = function openui5Generator( args, options, config ) {
        ScriptBase.apply( this, arguments );
        console.log( this.yeoman );

        this.hookFor( "openui5:view", {
            options: {
                args: args,
                options: {
                    skipApplicationJs: false, // Tell the view to also copy the Application.js (since the ViewName needs to be added there)
                    fiori: this.fiori
                }
            }
        } );

        this.on( "end", function() {
            this.installDependencies( {
                skipInstall: options[ "skip-install" ]
            } );
        } );

        this.pkg = JSON.parse( this.readFileAsString( path.join( __dirname, "../package.json" ) ) );
    };

    util.inherits( openui5Generator, ScriptBase );

    openui5Generator.prototype.askFor = function askFor() {
        var cb = this.async();

        var prompts = [ {
            name: "applicationName",
            message: "What do you want to name this application?",
            default: "My Application"
        }, {
            name: "appDescription",
            message: "Please describe it with a few words:"
        }, {
            name: "authorName",
            message: "What is your name?",
            default: "John Doe"
        }, {
            name: "gitRepository",
            message: "What is your git repository?",
            default: "ssh://github.com/ropository/url.git"
        }, {
            name: "licenseType",
            message: "What is your license Type?",
            default: "Apache License, Version 2.0"
        }, {
            type: "checkbox",
            name: "features",
            message: "What more would you like?",
            choices: [ {
                name: "Fiori app",
                value: "fiori",
                checked: false
            }, {
                name: "CoffeeScript (not implemented)", // NOT IMPLEMENTED YET! will generate all JS as CoffeeScript
                value: "coffee",
                checked: false
            } ],
        }, {
            when: function( response ) {
                return ( response.features.indexOf( "fiori" ) !== -1 );
            },
            name: "componentNamespace",
            message: "What component namespace do you want?",
            default: "sap.ui.demo"
        }, {
            // This question is to allow the user to choose from various basic types of fiori app
            when: function( response ) {
                return ( response.features.indexOf( "fiori" ) !== -1 );
            },
            type: "checkbox",
            name: "fiori_options",
            message: "What type of Fiori app?",
            choices: [ {
                name: "Master / Detail",
                value: "masterdetail",
                checked: true
            }, {
                name: "Something else... (not implemented)",
                value: "somethingelse",
                checked: false
            } ]
        } ];

        this.prompt( prompts, function( props ) {
            this.applicationName = props.applicationName;
            this.appDescription = props.appDescription;
            this.authorName = props.authorName;
            this.gitRepository = props.gitRepository;
            this.licenseType = props.licenseType;

            // check for other features...
            var features = props.features;

            function hasFeature( feat ) {
                return features.indexOf( feat ) !== -1;
            }
            this.fiori = hasFeature( "fiori" );
            this.coffee = hasFeature( "coffee" );

            // We need to pass the fiori option through to the called View generator. At this stage
            // it can only be done via files as the options passed to the view generator are already
            // set before the app generator questions are answered...
            // If we are scaffolding a fiori app we don't need the view generator so it will just exit.
            var LocalStorage = require( "node-localstorage" ).LocalStorage;
            if ( this.fiori === true ) {
                new LocalStorage( "./scratch" ).setItem( "fiori", "true" );
            } else {
                new LocalStorage( "./scratch" ).setItem( "fiori", "false" );
            }

            this.namespace = props.componentNamespace;

            cb();
        }.bind( this ) );
    };

    openui5Generator.prototype.app = function app() {
        if ( this.fiori ) {
            scaffoldFioriApp( this );
        } else {
            scaffoldApp( this );
        }
    };

    openui5Generator.prototype.projectfiles = function projectfiles() {
        this.copy( "Gruntfile.js", "Gruntfile.js" );
        this.copy( "jshintrc", ".jshintrc" );
        this.template( "_bower.json", "bower.json" );
        this.template( "_package.json", "package.json" );
        this.template( "_README.md", "README.md" );
    };

    /* Can't add this to the generator prototype, otherwise yo will call it */
    function scaffoldApp( that ) {
        that.mkdir( "css" );
        that.copy( "application/css/style.css", "css/style.css" );

        that.mkdir( "ext" );
        that.copy( "gitkeep", "ext/.gitkeep" );

        that.mkdir( "test" );
        that.copy( "gitkeep", "test/.gitkeep" );

        that.mkdir( "i18n" );
        that.copy( "application/i18n/messageBundle.properties", "i18n/messageBundle.properties" );

        that.mkdir( "img" );
        that.copy( "gitkeep", "img/.gitkeep" );

        that.mkdir( "model" );
        that.copy( "application/model/Config.js", "model/Config.js" );
        that.copy( "application/model/img.json", "model/img.json" );

        that.mkdir( "util" );
        that.copy( "gitkeep", "util/.gitkeep" );

        that.template( "application/_index.html", "index.html" );
    }

    /* Can't add this to the generator prototype, otherwise yo will call it */
    function scaffoldFioriApp( that ) {
        that.mkdir( "css" );
        that.copy( "gitkeep", "css/.gitkeep" );

        that.mkdir( "i18n" );
        that.copy( "fiori_application/i18n/messageBundle.properties", "i18n/messageBundle.properties" );

        that.mkdir( "model" );
        that.copy( "fiori_application/model/Config.js", "model/Config.js" );
        that.copy( "fiori_application/model/img.json", "model/img.json" );
        that.copy( "fiori_application/model/mock.json", "model/mock.json" );

        that.mkdir( "util" );
        that.template( "fiori_application/util/_Formatter.js", "util/Formatter.js" );
        that.template( "fiori_application/util/_Grouper.js", "util/Grouper.js" );

        that.mkdir( "view" );
        that.template( "fiori_application/view/_App.view.js", "view/App.view.js" );
        that.template( "fiori_application/view/_App.controller.js", "view/App.controller.js" );
        that.template( "fiori_application/view/_Master.view.xml", "view/Master.view.xml" );
        that.template( "fiori_application/view/_Master.controller.js", "view/Master.controller.js" );
        that.template( "fiori_application/view/_Empty.view.xml", "view/Empty.view.xml" );
        that.template( "fiori_application/view/_Detail.view.xml", "view/Detail.view.xml" );
        that.template( "fiori_application/view/_Detail.controller.js", "view/Detail.controller.js" );
        that.template( "fiori_application/view/_LineItem.view.xml", "view/LineItem.view.xml" );
        that.template( "fiori_application/view/_LineItem.controller.js", "view/LineItem.controller.js" );

        that.template( "fiori_application/_index.html", "index.html" );
        that.template( "fiori_application/_Component.js", "Component.js" );
    }
}() );