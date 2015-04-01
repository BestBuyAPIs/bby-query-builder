'use strict';

angular.module('appServices').factory('PreSelectOperatorService', [ function () {
    
    var preSelectOperator = function(form) {
        form.opt = form.value.operator[0];
        form.complexVal = form.value.valueOptions ? form.value.valueOptions[0].value : '';
    };

	return {
		preSelectOperator : preSelectOperator
	}
}]);