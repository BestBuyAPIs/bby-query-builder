'use strict';

angular.module('appServices').factory('GaService', [ function() {
    
    var clickQueryButton = function(eventActionName, apiKey){
    	// var eventActionName = '';
    	return ga('send', 'event', 'button click', eventActionName, {'dimension1': apiKey});
    };

    var watchApiKey = function (apiKey) {
        //ng-minlength & ng-maxlength sets apikey as undefined unless it is the proper length
        if (apiKey){
            ga('send', 'event', 'user input', 'tried entering an api key', {'dimension1': apiKey});
        };
    };

    return {
    	clickQueryButton : clickQueryButton,
    	watchApiKey : watchApiKey
    }
}]);