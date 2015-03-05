'use strict';

angular.module('bby-query-mixer.categories').controller('CategoriesCtrl', [
    '$scope',
    'HttpClientService',
    'GaService',
    'categoryResponseConfig',
    function ($scope, HttpClientService, GaService, categoryResponseConfig) {

        $scope.buildRemixQuery = function () {
           
        };

        $scope.invokeRemixQuery = function () {
        };

        $scope.buildParams = function () {
           
        };

        $scope.categoryResponse = {};

        $scope.resetParams = function () {
            $scope.categoryResponse.list = [];
            $scope.categoryResponses = angular.copy(categoryResponseConfig);
        };
        //calling the function here loads the defaults on page load
        $scope.resetParams();

        $scope.addAllOptions = function(optionArray) {
            var newArray = [];
            angular.forEach(optionArray, function(i) { this.push(i.value) }, newArray);
            return newArray;
        };

    }
]);