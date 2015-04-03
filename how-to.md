How to Add More Tabs to the Query Builder

1. Create a directory for the tab inside `app/` where the js, css and html files will live
1. Instantiate a new module for the tab and add it as a dependency to the main angular app module in `app/app.js`. Your controller and tab-specific services/constants/directives should be added to that specific module. If you need to use that code in other tabs, you can add those to the app-wide `appConstants` or `appServices` instead.
1. Add the file path for the above directory to the jsFiles and the cssFiles array in `Gruntfile.js` and the test coverage in `karma.conf.js` . This ensures that the js and css files will be added to the `app/production.js` and `app/production.css` files that will actually get run by the page.
1. The pattern QB has followed is for each tab to have its own `00-module.js` file where the module is instantiated and the controller is tied to the view, so that the ng-router can do its thing.
1. Add test files for the tab to the `app/test` directory. They should be named *tabName*_test.js to be consistent
1. The `appConstants` and `appServices` files hold functions and other data that are used in multiple tabs. If your tab needs these, simply add them as dependencies into your tab's controller.
1. Each tab has some calls to Google Analytics that register events such as a successful call to the remix api or using the clipboard button to copy a query url. The main Google Analytics functions are in a service in `app/appServices/analytics.js` You can also look at the other invoke___query functions in the other tabs to get an idea on how to configure them.
1. To check the test coverage of your new file when it is all configured, open the `index.html` at `./coverage/../index.html`. This file is created after running `npm test`.
1. Presently, our own js and css files are concatened so we only need to call on one file each. Each small js and css file took up a network request and by cutting those requests in half with concatenation, we got the QB to load in roughly half the time. However, the bower components are not concatened (though this is possible with grunt) so new ones will have to be included in the `/app/index.html` file
1. The multi-select boxes use the ui-select directive from the angular ui team. The dynamic forms (the +/- ones on the products tab for example) are mostly custom written. There is a form template tied to the scope, and an ng-repeat renders a list of items where the items are instances of that form template. The dynamic forms are set to a ng-model such as `showOptions.list` where `showOptions` is set as an empty object. the `.list` is important.  Then the parseDynamicForms service is called to pull all of those form items together and return an array of values. The parseDynamicForms functions also have special rules for the outlier values like 'sku in' that require special syntax in the api.
1. Whenever possible, constants such as a list of values to populate a select dropdown are put into angular `.constants` instead of keeping them in controllers. $scope values that will end up changing are harder to put into angular constants, so each controllers resetParams function will have those. The resetParams is also called at initial page load, so if you have to instantiate some scope values put them in there.
1. According to the spec, all links should have `target="_blank"` so they open in a new tab. This is so that if a user has entered a complex query they are less likely to lose it if they click on a link to the docs.
1. The URL Breakdown section describes each part of the query string as atomic units. We are using angular's `ng-show` syntax to only display these when they are also in the main Complete URL section.
1. We set initial scope values so that select dropdowns and other forms are not blank on page load. This is trickier when certain forms are hidden on page load and only show up when a user goes down a certain path. In cases like this we've used `ng-change()` calls that can preselect a value so that these new forms show up without blank values. For example, the function `app/appServices/preSelectOperator.js` is called on `productSearch/productSearch.html:26` because the rest of the form is not rendered until a value is chosen for the first option as seen below
```                     
<div class="form-group" ng-repeat="form in dynamicForms track by $index">
    <div class="" id="complexSearch">
        <form>
            <select ng-init="form.value = attributeOption" id="attribute" ng-model="form.value" ng-change="preselectOperator(form)"
                    ng-options="attr as attr.text for attr in attributeOptions"></select>
            <select class="optDropdown" ng-show="form.value.productAttribute" id="operator" ng-model="form.opt" ng-change="skuInParens()"
                    ng-options="opt as opt.value for opt in form.value.operator" selected="{{dynamicOption.list[form.id].operator[0].value}}"></select>
            <input class="rounded" parenswrap ng-show="form.value.productAttribute && (form.value.type != 'boolean')" ng-model="form.complexVal" min="0" ng-maxlength="50" placeholder="{{form.value.placeholder}}">
            <select ng-show="form.value.type === 'boolean'"  ng-model="form.complexVal" ng-options="opt.value as opt.value for opt in form.value.valueOptions"></select>
            <span class="glyphicon glyphicon-minus" ng-show="dynamicForms.length > 1" ng-click="removeForm(form)"></span>
        </form>
        <span id="plus-button" class="glyphicon glyphicon-plus" ng-show="$last && (form.value.productAttribute)" ng-click="addNewForm()"></span>
    </div>
</div>
```