(function() {
    'use strict';

    angular
        .module('wallavicApp')
        .controller('IncomeDetailController', IncomeDetailController);

    IncomeDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Income', 'User'];

    function IncomeDetailController($scope, $rootScope, $stateParams, previousState, entity, Income, User) {
        var vm = this;

        vm.income = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('wallavicApp:incomeUpdate', function(event, result) {
            vm.income = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
