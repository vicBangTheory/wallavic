(function() {
    'use strict';
    angular
        .module('wallavicApp')
        .factory('HomeFilterProducts', HomeFilterProducts);

    HomeFilterProducts.$inject = ['$http', 'AlertService'];

    function HomeFilterProducts ($http, AlertService) {

        vm.productVar = {};
        vm.productVar.data = [];
        vm.productVar.page = 1;
        vm.productVar.links = {};
        vm.productVar.links.last = 0;
        vm.productVar.sort = 'id,desc';
        vm.productVar.size = 5;

        vm.productVar.filters = {};
        vm.productVar.filters.onSale;
        vm.productVar.filters.minPrice;
        vm.productVar.filters.maxPrice;
        vm.productVar.filters.cats = [];

        vm.productDto.isLoading = false;

        var service = {
            
        };

        return service;


        function search() {
            var prodDto = createProductDto();
            User.query({
                page: vm.productVar.page - 1,
                size: vm.productVar.size,
                sort: vm.productVar.sort,
                productDto: prodDto
            }, onSuccess, onError);
        }

         function onSuccess(data, headers) {
            vm.productVar.links = ParseLinks.parse(headers('link'));
            vm.totalItems = headers('X-Total-Count');
            for (var i = 0; i < data.length; i++) {
                vm.productVar.data.push(data[i]);
            }
            vm.productDto.isLoading = false;
        }

        function onError(error) {
            AlertService.error(error.data.message);
        }

        function createProductDto() {
            var productDto = {
                'onSale': vm.productVar.filters.onSale,
                'maxPrice': vm.productVar.filters.minPrice,
                'minPrice': vm.productVar.filters.maxPrice,
                'productCats': productCats.length > 0 ?  productCats : null
            }
            return productDto;
        }
        
    }
})();
