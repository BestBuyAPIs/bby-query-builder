'use strict';

angular.module('appServices').factory('HttpClientService', ['$resource', function($resource) {
    
    var httpClient = function (query) {
		return $resource(query, {});
	};

	return {
		httpClient : httpClient
	}
}]);