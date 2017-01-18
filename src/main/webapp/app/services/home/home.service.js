(function() {
    'use strict';
    angular
        .module('wallavicApp')
        .factory('HomeService', HomeService);

    HomeService.$inject = ['$http'];

    function HomeService ($http) {

        var service = {
            
        };

        return service;
        
    }
})();
