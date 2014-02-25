# generator-openui5 [![Build Status](https://secure.travis-ci.org/saschakiefer/generator-openui5.png?branch=master)](https://travis-ci.org/saschakiefer/generator-openui5)

A OpenUI5 generator for [Yeoman](http://yeoman.io).


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
This will generate a complete runnable OpenUI5 Application with a main view and some infrastructure around it.

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
#####Sub Generators and Namespaces
When creating a component, you get asked "Do you want to add it to the application namespace?". What does that mean?

When you create a component or view, you can add namespace based name (e.g. foo.bar.Component). That component will then be created in the sub directory ```ApplicationRoot/foo/bar/Component``` and it will be referenced in the code with "foo.bar.Component". Per default the resource root "foo" is not known to UI5 so you have to make it known to the framework. Usually that is done with a ```sap.ui.localResources("foo")``` statement (or a ```data-sap-ui-resourceroots``` entry in the bootstrap).

Especially in Fiori like apps one often has an application namespace set in the bootstrap (sth. like ```data-sap-ui-resourceroots='{"sap.ui.demo": "./"}'```). With that you have the possibility to prefix your component name foo.bar.Component with sap.ui.demo to sap.ui.demo.foo.bar.Component, so that UI5 can find the coding without adding an additional resource root.

That is exactly what happens, when you choose _yes_ as an answer for the above question. The generator tries to assemble the current application namespace and adds that to the component name (same for views). For sure, you have to possibility to change that name before it's finally generated.


## Participate
We're happy about everybody who wants to help us create an even more amazing tool. To make sure, that everything fits together, please familiarize yourself with our project guidelines:

* [Git Branching Model](https://github.com/saschakiefer/generator-openui5/wiki/Git%20Branching%20Model)
* [Git Commit Guidelines](https://github.com/saschakiefer/generator-openui5/wiki/Git-Commit-Guidelines)
* [Code Format Guidelines](https://github.com/saschakiefer/generator-openui5/wiki/Code-Format-Guidelines)

## License

[Apache License, Version 2.0](https://github.com/saschakiefer/generator-openui5/blob/master/LICENSE)
