'use strict';

angular.module('appServices').factory('HttpClientService', ['$resource', function($resource) {
    
    var httpClient = function (query) {
		return $resource(query, {}, {
		    jsonp_query: {
		        method: 'JSONP'
		    }
		});
	};

	return {
		httpClient : httpClient
	}
}]);


        // var httpClient = function (query) {
        //     return $resource(query, {}, {
        //         jsonp_query: {
        //             method: 'JSONP'
        //         }
        //     });
        // };

        // $scope.invokeRemixQuery = function () {
        //     $scope.results = "Running";
        //     var query = $scope.buildRemixQuery();
        //     var successFn = function (value) {
        //         $scope.results = value;
        //     };
        //     var errorFn = function (httpResponse) {
        //         $scope.results = httpResponse;
        //     };

        //     if (($scope.apiKey !==  "")&($scope.searchSelection.value !== 0)){
        //         $scope.errorResult = false;
        //         httpClient(query).jsonp_query(successFn, errorFn);
        //     }else if ($scope.apiKey ===  ""){
        //         $scope.errorResult = true;
        //         $scope.results = "Please enter your API Key";
        //     } else{
        //         $scope.errorResult = true;
        //         $scope.results = "Please pick a search option";
        //     };
        // };