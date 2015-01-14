'use strict';

describe('bby-query-mixer', function () {
    beforeEach(module('bby-query-mixer'));
    describe('routes', function () {
        var $route;

        beforeEach(inject(function (_$route_) {
            $route = _$route_;
        }));
        it('defaults to /productSearch', function () {
            expect($route.routes['null'].redirectTo).toEqual('/productSearch');
        });
        it('renders productSearch at /productSearch', function () {
            expect($route.routes['/productSearch'].templateUrl).toEqual('productSearch/productSearch.html');
            expect($route.routes['/productSearch'].controller).toEqual('ProductSearchCtrl');
        });
        it('renders recommendations at /recommendations', function () {
            expect($route.routes['/recommendations'].templateUrl).toEqual('recommendations/recommendations.html');
            expect($route.routes['/recommendations'].controller).toEqual('RecommendationsCtrl');
        });
    });
    describe('default view controller', function () {
        var ctrl, scope;
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            ctrl = $controller('pageController', {
                $scope: scope
            });
        }));
        it('should have apiKey', function () {
            expect(scope.apiKey).toBeDefined();
        });
    });
});