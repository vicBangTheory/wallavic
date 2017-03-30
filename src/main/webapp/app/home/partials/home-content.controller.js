(function() {
    'use strict';

    angular
        .module('wallavicApp')
        .controller('HomeContentController', HomeContentController);

    HomeContentController.$inject = ['$scope', 'Principal', 'LoginService', '$state', 'Product', '$location', 'UtilsProduct', 'AlertService', 'ParseLinks'];

    function HomeContentController ($scope, Principal, LoginService, $state, Product, $location, UtilsProduct, AlertService, ParseLinks) {
        var vm = this;

        vm.products = [];
        vm.loadPage = loadPage;
        vm.page = 0;
        vm.links = {
            last: 0
        };
        vm.size = 10;

        vm.filters = {
            cats: [],
            sold: false,
            maxPrice: 10000000000.0,
            minPrice: 0.0
        }

        loadAll();

        function loadAll () {
            UtilsProduct.getProductsWithFilters(vm.filters, vm.page, vm.size, '').then(onSuccess, onError);
        }

        function onSuccess(response) {
            var data = response.data;
            var headers = response.headers;
            vm.links = ParseLinks.parse(headers('link'));
            vm.totalItems = headers('X-Total-Count');
            for (var i = 0; i < data.length; i++) {
                vm.products.push(data[i]);
            }
            vm.control = true;
        }

        function onError(error) {
            AlertService.error(error.data.message);
        }


        function loadPage(page) {
            vm.control = false;
            vm.page = page;
            loadAll();
        }

        $scope.$on('filteringSearch', function(event, newFilters) {
            vm.filters.cats = newFilters.cats;
            if(newFilters.minPrice){
                vm.filters.minPrice = newFilters.minPrice;
            }else{
                vm.filters.minPrice = 0;
            }
            if (newFilters.maxPrice) {
                vm.filters.maxPrice = newFilters.maxPrice;
            }else{
                vm.filters.maxPrice = 10000000000.0;
            }
            vm.filters.sold = newFilters.sold;
            vm.page = 0;
            vm.links = {
                last: 0
            };
            vm.products = [];
            vm.size = 20;
            loadAll();
            vm.size = 10;
        });





    }
})();
