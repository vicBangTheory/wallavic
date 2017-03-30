

(function() {
    'use strict';
    angular
        .module('wallavicApp')
        .factory('PaginationService', PaginationService);

    PaginationService.$inject = ['$http', 'ParseLinks'];

    function PaginationService ($http, ParseLinks) {


        var service = {
            processData: processData
        }

        return service;

        /* Process the headers and data of any http call with pagination */
        function processData(response) {
            var dataJson = {};
            dataJson.links = ParseLinks.parse(response.headers('link'));
            dataJson.totalItems = response.headers('X-Total-Count');
            dataJson.data = response.data;
            return dataJson;
        }
    }
})();
