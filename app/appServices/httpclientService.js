'use strict';

angular.module('appServices').factory('HttpClientService', ['$resource', function($resource) {
    
    var httpClient = function (query) {
		return $resource(query, {}, {
		    json_query: {
		        method: 'JSON'
		    }
		});
	};

	return {
		httpClient : httpClient
	}
}]);