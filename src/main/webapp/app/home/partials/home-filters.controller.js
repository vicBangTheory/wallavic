(function() {
    'use strict';

    angular
        .module('wallavicApp')
        .controller('HomeFiltersController', HomeFiltersController);

    HomeFiltersController.$inject = ['$locale', '$rootScope'];

    function HomeFiltersController ($locale, $rootScope) {
        var vm = this;

        vm.filters = {};
        vm.filters.minPrice = 0;
        vm.categories = $locale['PRODUCT_CATEGORY'];
        vm.showErrorForm = false;
        vm.newSearch = newSearch;
        vm.checkIfValid = checkIfValid;

        function newSearch() {
            console.log(vm.filters);
            vm.filters.cats = [];
            setCats()
            vm.filters.sold = false;
            $rootScope.$broadcast('filteringSearch', vm.filters);
        }

        function checkIfValid() {
            console.log(vm.filters.maxPrice );

            if((vm.filters.maxPrice != undefined || vm.filters.maxPrice != null) && vm.filters.minPrice > vm.filters.maxPrice){
                vm.showErrorForm = true;
            }else{
                vm.showErrorForm = false;
            }
        }

        function setCats() {
            angular.forEach(vm.categories, function (category) {
                if(vm.cats && vm.cats[category.value]){
                    vm.filters.cats.push(category.value);
                }
            })
        }

    }
})();
