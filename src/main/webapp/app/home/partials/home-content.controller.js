(function() {
    'use strict';

    angular
        .module('wallavicApp')
        .controller('HomeContentController', HomeContentController);

    HomeContentController.$inject = ['$scope', 'Principal', 'LoginService', '$state', 'Product'];

    function HomeContentController ($scope, Principal, LoginService, $state, Product) {
        var vm = this;

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






        vm.page = 0;
        vm.links = {
            last: 0
        };

        function loadPageUsers(page) {
            vm.loadingUsers = true;
            vm.page = page;
            loadUsers();
            
        }
    }
})();
