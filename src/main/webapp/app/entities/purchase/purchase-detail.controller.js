(function() {
    'use strict';

    angular
        .module('wallavicApp')
        .controller('PurchaseDetailController', PurchaseDetailController);

    PurchaseDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Purchase', 'User', 'Product'];

    function PurchaseDetailController($scope, $rootScope, $stateParams, previousState, entity, Purchase, User, Product) {
        var vm = this;

        vm.purchase = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('wallavicApp:purchaseUpdate', function(event, result) {
            vm.purchase = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
