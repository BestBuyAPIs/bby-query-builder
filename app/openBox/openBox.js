'use strict';

angular.module('bby-query-mixer.openBox').controller('openBoxCtrl', [
    '$scope',
    '$resource',
    'categoryConfig',
    function ($scope, $resource, categoryConfig) {
        $scope.categories = angular.copy(categoryConfig);
        $scope.category = $scope.categories[0];
        var httpClient = function (query) {
            return $resource(query, {}, {
                jsonp_query: {
                    method: 'JSONP'
                }
            });
        };

        $scope.options = [
            {text: "Select an Open Box Search Option", value:0},
        	{text: "Open Box Offers All SKUs", value:1},
        	{text: "Open Box Offers by Category", value:2},
        	{text: "Open Box Offers by List of SKUs", value:3},
        	{text: "Open Box Offers by SKU", value:4}
        ];
        
        $scope.searchSelection = $scope.options[0];

        $scope.resetParams = function () {
        	$scope.pagesize = 10;
        	$scope.whichPage = 1;
        	$scope.searchSelection = $scope.options[0];
        };

        $scope.resetParams();
}]);