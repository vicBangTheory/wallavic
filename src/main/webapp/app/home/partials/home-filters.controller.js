(function() {
    'use strict';

    angular
        .module('wallavicApp')
        .controller('HomeFiltersController', HomeFiltersController);

    HomeFiltersController.$inject = ['$locale'];

    function HomeFiltersController ($locale) {
        var vm = this;

        vm.filters = {};
        vm.filters.cat = {};

        vm.categories = $locale['PRODUCT_CATEGORY'];


    }
})();
