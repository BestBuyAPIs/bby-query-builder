'use strict';

angular.module('appServices').factory('AddAllShowOptionsService', [ function () {
    
    var addAllShowOptions = function(optionArray) {
        var newArray = [];
        angular.forEach(optionArray, function(i) { this.push(i.value) }, newArray);
        return newArray.join(',');
    };

	return {
		addAllShowOptions : addAllShowOptions
	}
}]);