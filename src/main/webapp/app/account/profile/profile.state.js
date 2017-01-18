(function() {
    'use strict';

    angular
        .module('wallavicApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('profile', {
            parent: 'account',
            url: '/profile',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'global.menu.account.profile'
            },
            views: {
                'content@': {
                    templateUrl: 'app/account/profile/profile.html',
                    controller: 'ProfileController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('profile');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
