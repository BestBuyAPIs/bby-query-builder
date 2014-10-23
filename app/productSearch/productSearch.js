'use strict';

angular.module('bby-query-mixer.productSearch').controller('ProductSearchCtrl', [
    '$scope',
    'categoryConfig',
    function ($scope, categoryConfig) {
        $scope.apiKey = '';
        $scope.categories = angular.copy(categoryConfig);
        $scope.category = $scope.categories[0];
        $scope.buildRemixQuery = function () {
            var categorySearchCriterion = $scope.category.value ? '(categoryPath.id=' + $scope.category.value + ')' : '';
            var apiKeyQueryString = $scope.apiKey ? '?apiKey=' + $scope.apiKey : '';

            if (categorySearchCriterion || apiKeyQueryString) {
                return 'https://api.remix.bestbuy.com/v1/products' + categorySearchCriterion + apiKeyQueryString;
            }

            return '';
        };
    }
]);