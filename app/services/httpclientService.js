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