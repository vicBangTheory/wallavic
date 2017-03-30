(function() {
    'use strict';
    angular
        .module('wallavicApp')
        .factory('HomeService', HomeService);

    HomeService.$inject = ['$http'];

    function HomeService ($http) {

        var service = {
            getProductsNotSold: getProductsNotSold
        };

        return service;

        function getProductsNotSold(pag, size, sort) {
            return $http.get('api/products_no_sold', {params:{page: page, size: size, sort: sortBy}});

        }

    }
})();
