(function() {
    'use strict';

    angular
        .module('wallavicApp')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['Principal', '$state', 'User'];

    function ProfileController (Principal, $state, User) {
        var vm = this;

        vm.toDisplay = {};
        vm.toDisplay.options = ['information', 'purchases', 'incomes'];
        vm.toDisplay.current = 'information';

        vm.changeView = changeView;
        vm.changeStateTo = changeStateTo;

        Principal.identity().then(function (data) {
            vm.login = data.login;
            User.get({login: vm.login}, function (user) {
                vm.user = user;
                console.log(user);
            });
        });

        function changeView(newView) {
            vm.toDisplay.current = newView;
        }

        function changeStateTo(state) {
            $state.go(state);
        }
    }
})();
