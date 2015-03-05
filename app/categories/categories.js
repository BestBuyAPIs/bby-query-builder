'use strict';

angular.module('bby-query-mixer.categories').controller('CategoriesCtrl', [
    '$scope',
    'HttpClientService',
    'GaService',
    function ($scope, categoryConfig, showOptionsConfig, attributeOptionsConfig, HttpClientService, GaService) {

        $scope.buildRemixQuery = function () {
           
        };

        $scope.invokeRemixQuery = function () {
        };

        $scope.buildParams = function () {
           
        };


        $scope.resetParams = function () {

        };
        //calling the function here loads the defaults on page load
        $scope.resetParams();

    }
]);