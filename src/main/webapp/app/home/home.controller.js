(function() {
    'use strict';

    angular
        .module('wallavicApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state', 'Product'];

    function HomeController ($scope, Principal, LoginService, $state, Product) {
        var vm = this;

        
    }
})();
