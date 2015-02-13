'use strict';

angular.module('appServices').factory('GaService', [ function() {
    
    var clickQueryButtonEvent = function(eventActionName, apiKey){
    	// var eventActionName = '';
    	return ga('send', 'event', 'button click', eventActionName, {'dimension1': apiKey});
    };

    var enterKeyEvent = function (apiKey) {
        //ng-minlength & ng-maxlength sets apikey as undefined unless it is the proper length
        if (apiKey){
            ga('send', 'event', 'user input', 'tried entering an api key', {'dimension1': apiKey});
        };
    };

    var copyUrlEvent = function (tab, apiKey) {
        ga('send', 'event', 'button click', 'copied a ' + tab + ' complete url', {'dimension1': apiKey});

    };

    return {
    	clickQueryButtonEvent : clickQueryButtonEvent,
    	enterKeyEvent : enterKeyEvent,
        copyUrlEvent : copyUrlEvent
    }
}]);