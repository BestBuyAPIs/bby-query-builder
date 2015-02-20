'use strict'
angular.module('bby-query-mixer.productSearch').directive("spaceless", function(){
   return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModelController) {
        ngModelController.$parsers.push(function(data) {
          //convert data from view format to model format
          return data.replace(/\s+/g, '&search='); //converted
        });
    
        ngModelController.$formatters.push(function(data) {
          //convert data from model format to view format
          return data.replace(/\s+/g, '&'); //converted
        });
      }
    };
});