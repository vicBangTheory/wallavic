(function() {
    'use strict';
    angular
        .module('wallavicApp')
        .factory('Product', Product);

    Product.$inject = ['$resource', 'DateUtils'];

    function Product ($resource, DateUtils) {
        var resourceUrl =  'api/products/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.uploadDate = DateUtils.convertDateTimeFromServer(data.uploadDate);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
