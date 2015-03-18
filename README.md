# BBY Query Builder

[![Build Status](https://travis-ci.org/BestBuyAPIs/bby-query-builder.svg)](https://travis-ci.org/BestBuyAPIs/bby-query-builder)

BBY Query Builder is an application to help developers learn Best Buy's APIs. It is based on [angular-seed](https://github.com/angular/angular-seed).

Included in this app are queries for fetching products:

1. belonging to common product categories
1. trending on [BestBuy.com](www.bestbuy.com)

## Getting Started

The rest of this page explains how to get the code and run it. If you want to use the application, go [here](http://bestbuyapis.github.io/bby-query-builder).

## Working with the code
### Prerequisites

You need git to clone the query-builder repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize and test query-builder. You must have node.js and
its package manager (npm) installed. You can get them from [http://nodejs.org/](http://nodejs.org/).

### Download bby-query-builder

Clone the BBY Query Builder repository using [git][git]:

```
git clone https://github.com/BestBuyAPIs/bby-query-builder.git
cd bby-query-builder
```

### Install Dependencies

We have two kinds of dependencies in this project: tools and Angular framework code. The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the Angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`. You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
query-builder changes this location through the `.bowerrc` file. Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Run the Application

We have preconfigured the project with a simple development web server. The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/app/index.html`.

## Testing

There are two kinds of tests in the application: unit tests and code coverage test.

### Running Unit Tests

The app comes preconfigured with unit tests. These are written in
[Jasmine][jasmine], which we run with the [Karma Test Runner][karma]. We provide a Karma
configuration file to run them.

* the configuration is found at `karma.conf.js`
* the unit tests are found next to the code they are testing and are named as `..._test.js`.

The easiest way to run the unit tests is to use the supplied npm script:

```
npm test
```

This script will start the Karma test runner to execute the unit tests. Moreover, Karma will sit and
watch the source and test files for changes and then re-run the tests whenever any of them change.
This is the recommended strategy; if your unit tests are being run every time you save a file then
you receive instant feedback on any changes that break the expected code functionality.

You can also ask Karma to do a single run of the tests and then exit. This is useful if you want to
check that a particular version of the code is operating as expected. The project contains a
predefined script to do this:

```
npm run test-single-run
```
#### Test Coverage
Our Karma test runner is configured to use a library called Istanbul to check for code coverage. It is automatically run with `npm test` and you can check the coverage report by opening the report file at `coverage/PhantomJS/index.html`

## Contact

For more information please visit [https://developer.bestbuy.com](https://developer.bestbuy.com)

And contact us directly [@bbyopen](https://twitter.com/bbyopen) or email us [developer@bestbuy.com](mailto:developer@bestbuy.com).


[angular]: http://angularjs.org/
[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[protractor]: https://github.com/angular/protractor
[jasmine]: http://jasmine.github.io
[karma]: http://karma-runner.github.io
[grunt]: http://gruntjs.com/
[zeroclipboard]: https://github.com/zeroclipboard/zeroclipboard
