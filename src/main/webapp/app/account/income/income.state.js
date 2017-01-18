(function() {
    'use strict';

    angular
        .module('wallavicApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('make-income', {
            parent: 'account',
            url: '/make-income',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'global.menu.account.make-income'
            },
            views: {
                'content@': {
                    templateUrl: 'app/account/income/income.html',
                    controller: 'IncomeController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('income');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
