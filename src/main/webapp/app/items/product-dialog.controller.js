(function() {
    'use strict';

    angular
        .module('wallavicApp')
        .controller('ProductDialogController', ProductDialogController);

    ProductDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Product', 'User', 'UtilsProduct', 'Principal'];

    function ProductDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Product, User, UtilsProduct, Principal) {
        var vm = this;

        vm.file = {};

        vm.product = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.users = User.query();
        vm.uploadModel = uploadModel;
        vm.removeFile = removeFile;

        Principal.identity().then(function(dtoUser){
            var userLogin = dtoUser.login;
            User.get({login: userLogin}, function (user) {
                vm.user = user;
            });
        });

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.product.id !== null) {
                UtilsProduct.updateItemImage(vm.product, vm.file).then(onSaveSuccess, onSaveError);
            } else {
                vm.product.user = vm.user;
                UtilsProduct.setItemImage(vm.product, vm.file).then(onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('wallavicApp:productUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.uploadDate = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }

        function uploadModel(newFile){
            vm.showErrorFile = false;
            if(newFile[0].size > 314572800){ 
                vm.showErrorFile = true;
                vm.file = {};
                closeInfo();
            }else{
                vm.showErrorFile = false;
                vm.file = newFile; 
            }
        }

        function closeInfo(){
            $timeout(function(){
                vm.showErrorFile = false;
            }, 2000);
        }

        function removeFile () {
            vm.file = [];
            vm.product.file = '';
        }

    }
})();
