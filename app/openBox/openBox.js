'use strict';

angular.module('bby-query-mixer.openBox').controller('openBoxCtrl', [
    '$scope',
    '$resource',
    'categoryConfig',
    function ($scope, $resource, categoryConfig) {

        var httpClient = function (query) {
            return $resource(query, {}, {
                jsonp_query: {
                    method: 'JSONP'
                }
            });
        };

        $scope.options = [
            {text: "Select an Open Box Search Option"},
        	{text: "Open Box Offers All SKUs"},
        	{text: "Open Box Offers by Category"},
        	{text: "Open Box Offers by List of SKUs"},
        	{text: "Open Box Offers by SKU"}
        ];
        
        $scope.searchSelection = $scope.options[0];

        $scope.resetParams = function () {
        	$scope.pagesize = 10;
        	$scope.whichPage = 1;
        	$scope.searchSelection = $scope.options[0];
        };

        $scope.resetParams();
}]);