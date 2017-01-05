(function() {
    'use strict';

    angular
        .module('wallavicApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('purchase', {
            parent: 'entity',
            url: '/purchase?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'wallavicApp.purchase.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/purchase/purchases.html',
                    controller: 'PurchaseController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }],
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('purchase');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('purchase-detail', {
            parent: 'entity',
            url: '/purchase/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'wallavicApp.purchase.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/purchase/purchase-detail.html',
                    controller: 'PurchaseDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('purchase');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Purchase', function($stateParams, Purchase) {
                    return Purchase.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'purchase',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('purchase-detail.edit', {
            parent: 'purchase-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/purchase/purchase-dialog.html',
                    controller: 'PurchaseDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Purchase', function(Purchase) {
                            return Purchase.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('purchase.new', {
            parent: 'purchase',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/purchase/purchase-dialog.html',
                    controller: 'PurchaseDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                date: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('purchase', null, { reload: 'purchase' });
                }, function() {
                    $state.go('purchase');
                });
            }]
        })
        .state('purchase.edit', {
            parent: 'purchase',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/purchase/purchase-dialog.html',
                    controller: 'PurchaseDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Purchase', function(Purchase) {
                            return Purchase.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('purchase', null, { reload: 'purchase' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('purchase.delete', {
            parent: 'purchase',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/purchase/purchase-delete-dialog.html',
                    controller: 'PurchaseDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Purchase', function(Purchase) {
                            return Purchase.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('purchase', null, { reload: 'purchase' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
