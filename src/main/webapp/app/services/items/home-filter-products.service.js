(function() {
    'use strict';
    angular
        .module('wallavicApp')
        .factory('HomeFilterProducts', HomeFilterProducts);

    HomeFilterProducts.$inject = ['$http', 'AlertService', 'Product'];

    function HomeFilterProducts ($http, AlertService, Product) {

        var productVar = {};
        productVar.data = [];
        productVar.page = 1;
        productVar.links = {};
        productVar.links.last = 0;
        productVar.sort = 'id,desc';
        productVar.size = 5;

        productVar.filters = {};
        productVar.filters.onSale;
        productVar.filters.minPrice;
        productVar.filters.maxPrice;
        productVar.filters.cats = [];

        productVar.isLoading = false;

        var service = {
            setFilters: setFilters,
            resetFilters: resetFilters
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

        
        ;

        function search(){
            var product =  createProductDto();
            $http.get('api/products', {params: {page: 1, example: {text:'hola'}}});
            // $http.get('api/products', {params: {page: 1, size: 5, productDto:prod}});
        }

        function search2() {
            var prodDto = createProductDto();
            Product.query({
                page: productVar.page - 1,
                size: productVar.size,
                sort: productVar.sort,
                productDto: prodDto
            }, onSuccess, onError);
        }

         function onSuccess(data, headers) {
            productVar.links = ParseLinks.parse(headers('link'));
            totalItems = headers('X-Total-Count');
            for (var i = 0; i < data.length; i++) {
                productVar.data.push(data[i]);
            }
            productVar.isLoading = false;
        }

        function onError(error) {
            AlertService.error(error.data.message);
        }

        function createProductDto() {
            var productDto = {
                'onSale': true,
                'maxPrice': 0.6,
                'minPrice': 0.2,
                // 'productCats': productVar.filters.cats.length > 0 ? productVar.filters.cats : null
            }
            return productDto;
        }

        function setFilters(filters) {
            console.log(filters)
            productVar.filters.onSale = filters.onSale;
            productVar.filters.minPrice = filters.minPrice;
            productVar.filters.maxPrice = filters.maxPrice;
            transformToArray(filters.cats);
            productVar.data = [];
            resetPagination();
            search();
            console.log(productVar.filters);
        }

        function resetFilters(){
            productVar.filters.minPrice;
            productVar.filters.maxPrice;
            productVar.filters.cats = [];
        }

        function resetPagination(){
            productVar.page = 1;
            productVar.links = {};
            productVar.links.last = 0;
            productVar.sort = 'id,desc';
            productVar.size = 5;
        }

        function transformToArray(cats){
            console.log(cats);
            productVar.filters.cats = [];
            angular.forEach(cats, function(key, value){
                if(key){
                    productVar.filters.cats.push(value);
                }
            });
        }
        
    }
})();
