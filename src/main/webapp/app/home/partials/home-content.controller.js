(function() {
    'use strict';

    angular
        .module('wallavicApp')
        .controller('HomeContentController', HomeContentController);

    HomeContentController.$inject = ['$scope', 'Principal', 'LoginService', '$state', 'Product', 'HomeSearchProducts'];

    function HomeContentController ($scope, Principal, LoginService, $state, Product, HomeSearchProducts) {
        var vm = this;
        
        vm.HomeSearchProducts = HomeSearchProducts;

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

        HomeSearchProducts.resetAll();
        HomeSearchProducts.firstSearch();



       
    }
})();
