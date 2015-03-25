'use strict';

angular.module('bby-query-mixer.reviews').controller('ReviewsCtrl', [
    '$scope',
    'categoryConfig',
    'HttpClientService',
    'GaService',
    'ProductServices',
    'reviewAttributeOptionsConfig',
    function ($scope, categoryConfig, HttpClientService, GaService, ProductServices, reviewAttributeOptionsConfig) {
                
        $scope.dynamicForms = [{id: '0',value:'',opt:'',complexVal:''}];
        var counter = 0;
        $scope.addNewForm = function() {
            counter += 1;
            $scope.dynamicForms.push({'id':''+(counter)});
        };
        $scope.removeForm = function(form) {
            var newItemNo = $scope.dynamicForms.length-1;
            $scope.dynamicForms.splice($scope.dynamicForms.indexOf(form),1);   
        };

        $scope.resetReviewsQuery = function () {
            $scope.whichPage = 1;
            $scope.pageSize = 10;
            $scope.attributeOptions = angular.copy(reviewAttributeOptionsConfig);
            $scope.attributeOption = $scope.attributeOptions[0];
            $scope.dynamicForms = [{value: $scope.attributeOption}];
        };
        $scope.resetReviewsQuery();

        $scope.parseDynamicForms = ProductServices.parseDynamicForms();
        $scope.preselectOperator = ProductServices.preSelectOperator;
}]);