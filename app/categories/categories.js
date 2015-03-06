'use strict';

angular.module('bby-query-mixer.categories').controller('CategoriesCtrl', [
    '$scope',
    'HttpClientService',
    'GaService',
    'categoryResponseConfig',
    function ($scope, HttpClientService, GaService, categoryResponseConfig) {

        $scope.searchOptions = [
            {text:"All Categories", value:"allcategories"},
            {text:"Top Level Categories", value:"toplevelcategories"},
            {text:"Search By Category Name", value:"categoryname"},
            {text:"Search By Category Id", value:"categoryid"},
            {text:"Search By Category Name and/or Id", value:"multiplecategoryparams"},
        ];

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
            $scope.searchSelection = $scope.searchOptions[0];
        };
        //calling the function here loads the defaults on page load
        $scope.resetParams();

        $scope.addAllOptions = function(optionArray) {
            var newArray = [];
            angular.forEach(optionArray, function(i) { this.push(i.value) }, newArray);
            return newArray;
        };

        $scope.selectAll = function (z) {
            if (z === 'categoryAttributes') {
                $scope.categoryResponse.list = $scope.addAllOptions($scope.categoryResponses);
            } else if (z === 'noResponse'){
                $scope.categoryResponse.list = [];
            }
            return;
        };

    }
]);
