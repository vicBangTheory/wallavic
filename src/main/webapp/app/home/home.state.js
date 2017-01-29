(function() {
    'use strict';

    angular
        .module('wallavicApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('home', {
            parent: 'app',
            url: '/',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/home/home.html',
                    controller: 'HomeController',
                    controllerAs: 'vm'
                },
                'filters@home': {
                    templateUrl: 'app/home/partials/home-filters.html',
                    controller: 'HomeFiltersController',
                    controllerAs: 'vm'
                },'products@home': {
                    templateUrl: 'app/home/partials/home-content.html',
                    controller: 'HomeContentController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                    $translatePartialLoader.addPart('home');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
