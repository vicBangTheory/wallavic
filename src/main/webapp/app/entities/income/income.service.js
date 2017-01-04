(function() {
    'use strict';
    angular
        .module('wallavicApp')
        .factory('Income', Income);

    Income.$inject = ['$resource', 'DateUtils'];

    function Income ($resource, DateUtils) {
        var resourceUrl =  'api/incomes/:id';

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
