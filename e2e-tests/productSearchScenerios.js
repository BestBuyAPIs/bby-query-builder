/*global browser:true, element:true, by:true*/
'use strict';

describe('bby-query-mixer', function () {
    describe('productSearch', function () {
        beforeEach(function () {
            browser.get('index.html#/productSearch');
        });
        it('should render productSearch and defaults are as expected', function () {
            expect(element(by.css('.selected-option')).getText()).toMatch('PRODUCT SEARCH');
            expect(element.all(by.css('[ng-view] label[for="category"]')).getText()).toMatch(/Select a category/);
            expect(element(by.model('category')).isPresent()).toBe(true);

            expect(element(by.id('sort-by-none')).isEnabled()).toBe(true);
            expect(element(by.id('sort-by-sku')).isEnabled()).toBe(true);
            expect(element(by.id('sort-by-saleprice')).isEnabled()).toBe(true);
            expect(element(by.id('sort-order-asc')).isEnabled()).toBe(true);
            expect(element(by.id('sort-order-desc')).isEnabled()).toBe(true);

            var remixQuery = element(by.css('span[id="remix-query"]'));
            expect(remixQuery.isPresent()).toBe(true);

            var copyButton = element(by.id('copy-button'));
            expect(copyButton).toBeDefined();
            expect(copyButton.element(by.css('[ng-view] img'))).toBeDefined();

            var category = element((by.model('category')));
            expect(category.all(by.css('option')).count()).toBe(20);
            expect(category.$('option[selected="selected"]').getText()).toEqual('All Cell Phones with Plans');
            expect(remixQuery.getText()).toBe('https://api.remix.bestbuy.com/v1/products(categoryPath.id=pcmcat209400050001)');

            var apiKeyInput = element(by.model('apiKey'));
            apiKeyInput.sendKeys('someApiKey');
            expect(remixQuery.getText()).toBe('https://api.remix.bestbuy.com/v1/products(categoryPath.id=pcmcat209400050001)?apiKey=someApiKey');

            element(by.cssContainingText('option', 'Laptops')).click();
            expect(remixQuery.getText()).toBe('https://api.remix.bestbuy.com/v1/products(categoryPath.id=abcat0502000)?apiKey=someApiKey');

            element(by.id('sort-by-sku')).click();
            expect(remixQuery.getText()).toBe('https://api.remix.bestbuy.com/v1/products(categoryPath.id=abcat0502000)?apiKey=someApiKey&sort=sku.asc');

            element(by.id('sort-order-desc')).click();
            expect(remixQuery.getText()).toBe('https://api.remix.bestbuy.com/v1/products(categoryPath.id=abcat0502000)?apiKey=someApiKey&sort=sku.desc');

            element(by.id('sort-by-saleprice')).click();
            expect(remixQuery.getText()).toBe('https://api.remix.bestbuy.com/v1/products(categoryPath.id=abcat0502000)?apiKey=someApiKey&sort=salePrice.desc');
        });
    });
});