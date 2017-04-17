# generator-openui5 [![Build Status](https://secure.travis-ci.org/saschakiefer/generator-openui5.png?branch=master)](https://travis-ci.org/saschakiefer/generator-openui5)

[Yeoman](http://yeoman.io) generator for [SAP OpenUI5](openui5.org).

This tool enables you to quickly scaffold out the boilerplate for an OpenUI5 app with a couple of quick command line questions.

As a bonus you get a full build workflow using [Grunt](http://gruntjs.com/) that allows you to live-reload your changes in the browser; build a production version of you app which is minimised and utilises library preload files and so on...

Features:
- Create base applications for: testing and Fiori-like apps
- Add a Grunt workflow to an existing OpenUI5 app
- Incorporates a full build workflow which enables on-the-fly code linting, browser re-loading
- Starts a web server to launch your generated application


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's a guy.

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### What is OpenUI5

UI5 lets you build enterprise-ready web applications, responsive to all devices, running on almost any browser of your choice. It’s based on JavaScript, using JQuery as its foundation and follows web standards. It eases your development with a client-side HTML5 rendering library including a rich set of controls and supports data binding to different models (JSON, XML and OData).

Visit the [OpenUI5 pages on github](http://sap.github.io/openui5/) for more information.

### OpenUI5 Generators

To install generator-openui5 from npm, run:

```
$ npm install -g generator-openui5
```

Finally, initiate the generator:

```
$ yo openui5
```
This will ask a couple of basic questions, then generate a complete runnable OpenUI5 Application with a main view and some infrastructure around it.

Yeoman uses the npm packaging system and will download all required dependencies so you might see a couple of screens flash by listing all of them. See below for some details on how you can run this when offline.

If you just need some parts of it, use the sub generators:
#### Sub Generators
Create a view with controller:

```
$ yo openui5:view
```

Create a UI Component:

```
$ yo openui5:uiComponent
```

Create a faceless Component:

```
$ yo openui5:facelessComponent
```

Add a build workflow using Grunt to an existing application:
```
$ yo openui5:build
```

##### Sub Generators and Namespaces
When creating a component, you get asked "Do you want to add it to the application namespace?". What does that mean?

When you create a component or view, you can add namespace based name (e.g. foo.bar.Component). That component will then be created in the sub directory ```ApplicationRoot/foo/bar/Component``` and it will be referenced in the code with "foo.bar.Component". Per default the resource root "foo" is not known to UI5 so you have to make it known to the framework. Usually that is done with a ```sap.ui.localResources("foo")``` statement (or a ```data-sap-ui-resourceroots``` entry in the bootstrap).

Especially in Fiori like apps one often has an application namespace set in the bootstrap (sth. like ```data-sap-ui-resourceroots='{"sap.ui.demo": "./"}'```). With that you have the possibility to prefix your component name foo.bar.Component with sap.ui.demo to sap.ui.demo.foo.bar.Component, so that UI5 can find the coding without adding an additional resource root.

That is exactly what happens, when you choose _yes_ as an answer for the above question. The generator tries to assemble the current application namespace and adds that to the component name (same for views). For sure, you have to possibility to change that name before it's finally generated.

## TDG Best Practices App
When generating the ```TDG Best Practices App``` please note that you should add the query parameter ```?responderOn=true``` to your local testing url. This allows you to use the mock data.

## Offline
Yeoman uses npm for dependency management so when you run a generator you will see a few screens flash past in the console listing each of the dependent modules. The dependencies are cached but npm still seems to go out onto the internet an check them everytime anyway.

So... if you've already done this at least once on your pc so that the dependencies are cached then you can follow the below instructions which basically just forces npm to use the cached dependencies instad of checking for new versions.

If you don't have an internet connection at the time then follow the steps below:
1. Run the generator with the skip-install option ```yo openui5 skip-install```
2. Manually install dependencies (bower only needed if you're using it):
```
bower install
npm install --cache-min 9999999
```
3. In the future when you do have an internet connection you can just do ```npm install```.

## Participate
We're happy about everybody who wants to help us create an even more amazing tool. To make sure, that everything fits together, please familiarize yourself with our project guidelines:

* [Git Branching Model](https://github.com/saschakiefer/generator-openui5/wiki/Git%20Branching%20Model)
* [Git Commit Guidelines](https://github.com/saschakiefer/generator-openui5/wiki/Git-Commit-Guidelines)
* [Code Format Guidelines](https://github.com/saschakiefer/generator-openui5/wiki/Code-Format-Guidelines)

## License

[Apache License, Version 2.0](https://github.com/saschakiefer/generator-openui5/blob/master/LICENSE)
