(function() {
    'use strict';
    angular
        .module('wallavicApp')
        .factory('HomeSearchProducts', HomeSearchProducts);

    HomeSearchProducts.$inject = ['$http', 'AlertService', 'Product', 'UtilsProduct', 'ParseLinks'];

    function HomeSearchProducts ($http, AlertService, Product, UtilsProduct, ParseLinks) {

        var productVar = {};
        productVar.data = [];
        productVar.page = 0;
        productVar.links = {};
        productVar.links.last = 0;
        productVar.sort = 'id,desc';
        productVar.size = 15;

        productVar.filters = {};
        productVar.filters.minPrice;
        productVar.filters.maxPrice;
        productVar.filters.cats = [];

        productVar.isLoading = false;

        var service = {
            setFilters: setFilters,
            resetFilters: resetFilters,
            resetAll: resetAll,
            firstSearch: firstSearch,
            getServiceVar: getServiceVar,
            setPageTo: setPageTo
        };

        return service;

        //  function search(){
        //     var prodDto = createProductDto();
        //     var config = {
        //         params: {page: 1, size: 5, productDto:prodDto},
        //         headers : {'Accept' : 'application/json'}
        //     };
        //     $http.get('api/products', config).then(onSuccess, onError);
        // }

        function getServiceVar(){
            return productVar;
        }

        function firstSearch(){
            search(productVar.filters, productVar.page, productVar.size, productVar.sort);
        }

        function search(productDto, page, size, sort) {
            UtilsProduct.getProductFiltered(productDto, page, size, sort).then(onSuccess, onError);
        }

         function onSuccess(response) {
            console.log(response.data)
            productVar.links = ParseLinks.parse(response.headers('link'));
            productVar.totalItems = response.headers('X-Total-Count');
            for (var i = 0; i < response.data.length; i++) {
                productVar.data.push(response.data[i]);
            }
            productVar.isLoading = false;
        }

        function onError(error) {
            AlertService.error(error.data.message);
        }

        function setFilters(filters) {
            productVar.filters.minPrice = filters.minPrice;
            productVar.filters.maxPrice = filters.maxPrice;
            productVar.filters.cats = transformToArray(filters.cats);
            productVar.data = [];
            resetPagination();
            search(productVar.filters, productVar.page, productVar.size, productVar.sort);
        }

        function resetAll(){
            resetFilters();
            resetPagination();
        }

        function resetFilters(){
            productVar.filters.minPrice = 0.0;
            productVar.filters.maxPrice = 100000000000.0;
            productVar.filters.cats = [];
        }

        function resetPagination(){
            productVar.page = 0;
            productVar.links = {};
            productVar.links.last = 0;
            productVar.sort = 'id,desc';
            productVar.size = 15;
        }

        function transformToArray(cats){
            var arrayCats = [];
            productVar.filters.cats = [];
            angular.forEach(cats, function(key, value){
                if(key){
                    arrayCats.push(value);
                }
            });
            return arrayCats;
        }

        function setPageTo(page){
            productVar.page = page;
        }
        
    }
})();
