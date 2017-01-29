(function() {
    'use strict';

    angular
        .module('wallavicApp')
        .controller('HomeFiltersController', HomeFiltersController);

    HomeFiltersController.$inject = ['$locale', 'HomeSearchProducts'];

    function HomeFiltersController ($locale, HomeSearchProducts) {
        var vm = this;

        vm.filters = {};
        vm.filters.cat = {};
        vm.categories = $locale['PRODUCT_CATEGORY'];
        vm.data = {};

        vm.newSearch = newSearch;

        function newSearch() {
            vm.filters.onSale = true;
            HomeSearchProducts.setFilters(vm.filters);
        }

    }
})();
