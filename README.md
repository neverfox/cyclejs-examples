# CycleJS examples

A practical matherial for those who succeeded with [official documentation](http://cycle.js.org/getting-started.html).

Examples are grouped into lessons and placed in narrative order.
They are meant to be reviewed one by one, sequentially. Every example is accompanied
by a tutorial text (see links below). To review examples, install and run app and inspect app files.
The best way of learning is comparison. And to compare you just diff files.

## Install

```
$ wget https://github.com/ivan-kleshnin/cyclejs-examples/archive/master.zip; unzip master.zip -d cyclejs-examples; rm master.zip
$ cd cyclejs-examples
$ npm install; bower install; bin/install
```

## Run

This repo uses [Webpack](http://webpack.github.io/) for builds and development, and
[Babel](babeljs.io) for ES6 -> ES5 convertions.

Run in dev mode (with live reload). Files are served from memory.
```
$ npm run dev
```
See dev.html

Rebuild examples.
```
$ npm run build
```
See index.html

## Lint

```
$ npm run eslint -s (mute node output)
```

## Lessons

### [1. Gentle Introduction](docs/lessons-1.md)

Covers **CycleJS@1.0**

#### 1.1: Hello Nodes

#### 1.2: Hello Components

#### 1.3: Hello Apps

### [2. Reimplementing React examples](docs/lessons-2.md)

Covers previous **CycleJS@0.24** version. Gonna be updated soon.

#### 2.00: Timer Basic

#### 2.01: Timer Control

#### 2.02: Timer Control 2

#### 2.03: Timer Stopwatch

#### 2.10: Menu Stateless

#### 2.11: Menu Stateful

### 3. [Tetris Game](https://github.com/ivan-kleshnin/tetris-cyclejs)

There will be more.

## Useful links

* [Marble diagrams of Rx operators](http://rxmarbles.com/)
* [RxJS documentation](https://github.com/Reactive-Extensions/RxJS/tree/master/doc)
* [Web app dataflows](https://github.com/Paqmind/dataflows)

