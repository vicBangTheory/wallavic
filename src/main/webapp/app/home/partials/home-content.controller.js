(function() {
    'use strict';

    angular
        .module('wallavicApp')
        .controller('HomeContentController', HomeContentController);

    HomeContentController.$inject = ['$scope', 'Principal', 'LoginService', '$state', 'Product', 'HomeSearchProducts', '$location'];

    function HomeContentController ($scope, Principal, LoginService, $state, Product, HomeSearchProducts, $location) {
        var vm = this;
        vm.class = {};
       
        vm.HomeSearchProducts = HomeSearchProducts;

        vm.loadPage = loadPage;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }
        function register () {
            $state.go('register');
        }

        function loadPage(page) {
            setPageTo(page);
            HomeSearchProducts.firstSearch();
        }

        HomeSearchProducts.resetAll();
        HomeSearchProducts.firstSearch();



       
    }
})();
