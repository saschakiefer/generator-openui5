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

## License

[MIT License](https://github.com/saschakiefer/generator-openui5/blob/master/LICENSE)
