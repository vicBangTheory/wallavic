(function() {
    'use strict';

    angular
        .module('wallavicApp')
        .controller('IncomeDialogController', IncomeDialogController);

    IncomeDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Income', 'User'];

    function IncomeDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Income, User) {
        var vm = this;

        vm.income = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.users = User.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.income.id !== null) {
                Income.update(vm.income, onSaveSuccess, onSaveError);
            } else {
                Income.save(vm.income, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('wallavicApp:incomeUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.date = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
