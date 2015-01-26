'use strict';

angular.module('bby-query-mixer.openBox').controller('openBoxCtrl', [
    '$scope',
    '$resource',
    function ($scope, $resource) {

        var httpClient = function (query) {
            return $resource(query, {}, {
                jsonp_query: {
                    method: 'JSONP'
                }
            });
        };



}]);