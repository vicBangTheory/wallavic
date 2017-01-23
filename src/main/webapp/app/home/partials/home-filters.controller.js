(function() {
    'use strict';

    angular
        .module('wallavicApp')
        .controller('HomeFiltersController', HomeFiltersController);

    HomeFiltersController.$inject = ['$locale', 'HomeFilterProducts'];

    function HomeFiltersController ($locale, HomeFilterProducts) {
        var vm = this;

        vm.filters = {};
        vm.filters.cat = {};
        vm.categories = $locale['PRODUCT_CATEGORY'];
        vm.data = {};

        vm.newSearch = newSearch;

        function newSearch() {
            vm.filters.onSale = true;
            console.log(vm.filters)
            HomeFilterProducts.setFilters(vm.filters);
        }

    }
})();
