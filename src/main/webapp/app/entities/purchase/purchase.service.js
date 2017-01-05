(function() {
    'use strict';
    angular
        .module('wallavicApp')
        .factory('Purchase', Purchase);

    Purchase.$inject = ['$resource', 'DateUtils'];

    function Purchase ($resource, DateUtils) {
        var resourceUrl =  'api/purchases/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.date = DateUtils.convertDateTimeFromServer(data.date);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
