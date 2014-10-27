# BBY Query Mixer

[![Build Status](https://travis-ci.org/BestBuyAPIs/bby-query-mixer.svg)](https://travis-ci.org/BestBuyAPIs/bby-query-mixer)

BBY Query Mixer is an application to help developers learn Best Buy's APIs. It is based on [angular-seed](https://github.com/angular/angular-seed).

Included in this app are queries for fetching products:

1. belonging to common product categories
1. trending on [BestBuy.com](www.bestbuy.com)

## Getting Started

The rest of this page explains how to get the code and run it. If you want to use the application, go [here](http://bestbuyapis.github.io/bby-query-mixer).

## Working with the code
### Prerequisites

You need git to clone the query-builder repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize and test query-builder. You must have node.js and
its package manager (npm) installed. You can get them from [http://nodejs.org/](http://nodejs.org/).

### Download bby-query-mixer

Clone the BBY Query Mixer repository using [git][git]:

```
git clone https://github.com/BestBuyAPIs/bby-query-mixer.git
cd bby-query-mixer
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

There are two kinds of tests in the application: unit tests and end-to-end tests.

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


### End to end testing

The app comes with end-to-end tests, also written in [Jasmine][jasmine]. These tests
are run with the [Protractor][protractor] end-to-end test runner. It uses native events and has
special features for Angular applications.

* the configuration is found at `protractor-conf.js`
* the end-to-end tests are found in `e2e-tests`

Protractor simulates interaction with our web app and verifies that the application responds
correctly. Therefore, our web server needs to be serving up the application, so that Protractor
can interact with it.

```
npm start
```

In addition, Protractor relies upon WebDriver. The project comes with a predefined script to install this:

```
npm run update-webdriver
```

This will download and install the latest version of the stand-alone WebDriver tool.

Once you have ensured that the development web server hosting our application is up and running
and WebDriver is updated, you can run the end-to-end tests using the supplied npm script:

```
npm run protractor
```

This script will execute the end-to-end tests against the application being hosted on the
development server.

### Testing Using Grunt

We use [Grunt][grunt] to quickly run both unit tests and end-to-end tests.

#### Initial Setup

Before running Grunt, install Grunt's command line interface and update the webdriver.

```
npm install -g grunt-cli
npm run update-webdriver
```

#### Running the Test Suite

Run the test suite.  (This will automatically start the app before testing and stop the app after testing is complete.)
```
grunt test
```

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
