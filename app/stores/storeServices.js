 'use strict';

angular.module('bby-query-mixer.stores').factory('StoreServices', [ function(){

    var filterStoreType = function (storeTypesArray) {
        var newArray = [];
        angular.forEach(storeTypesArray, function(i) {this.push('(storeType='+i+')')}, newArray);
        return newArray.join('|');
    };

    var filterStoreService = function (storeServiceArray) {
        var newArray = [];
        angular.forEach(storeServiceArray, function(i) {this.push('(services.service='+i+')')}, newArray);
        return newArray.join('&');
    };

    return {
    	filterStoreService : filterStoreService ,
    	filterStoreType: filterStoreType
    }

}]);