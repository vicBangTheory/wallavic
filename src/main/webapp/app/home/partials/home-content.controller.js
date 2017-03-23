(function() {
    'use strict';

    angular
        .module('wallavicApp')
        .controller('HomeContentController', HomeContentController);

    HomeContentController.$inject = ['$scope', 'Principal', 'LoginService', '$state', 'Product', 'HomeSearchProducts', '$location'];

    function HomeContentController ($scope, Principal, LoginService, $state, Product, HomeSearchProducts, $location) {
        var vm = this;
        vm.class = {};




    }
})();
