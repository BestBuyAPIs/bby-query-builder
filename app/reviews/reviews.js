'use strict';

angular.module('bby-query-mixer.reviews').controller('ReviewsCtrl', [
    '$scope',
    'categoryConfig',
    'HttpClientService',
    'GaService',
    'ProductServices',
    'reviewAttributeOptionsConfig',
    function ($scope, categoryConfig, HttpClientService, GaService, ProductServices, reviewAttributeOptionsConfig) {
        
        $scope.attributeOptions = angular.copy(reviewAttributeOptionsConfig);
        
        $scope.dynamicForms = [{id: '0',value:'',opt:'',complexVal:''}];

        $scope.resetReviewsQuery = function () {
            $scope.whichPage = 1;
            $scope.pageSize = 10;
        };
        $scope.resetReviewsQuery();

        $scope.parseDynamicForms = ProductServices.parseDynamicForms();
        $scope.preselectOperator = ProductServices.preSelectOperator;
}]);