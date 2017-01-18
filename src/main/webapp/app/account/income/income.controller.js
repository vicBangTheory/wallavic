(function() {
    'use strict';

    angular
        .module('wallavicApp')
        .controller('IncomeController', IncomeController);

    IncomeController.$inject = ['Principal', 'Income', '$scope', 'User'];

    function IncomeController (Principal, Income, $scope, User) {
        var vm = this;
        vm.income = {};

        vm.save = save;

        Principal.identity().then(function (data) {
        	vm.login = data.login;
        	User.get({login: vm.login}, function (user) {
        		vm.user = user;
        		console.log(user);
        	});
        });

        function save () {
            vm.isSaving = true;
            vm.income.user = vm.user;
            Income.save(vm.income, onSaveSuccess, onSaveError);
        }

        function onSaveSuccess (result) {
            $scope.$emit('wallavicApp:incomeUpdate', result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }
    }
})();
