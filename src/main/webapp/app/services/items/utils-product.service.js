(function() {
    'use strict';
    angular
        .module('wallavicApp')
        .factory('UtilsProduct', UtilsProduct);

    UtilsProduct.$inject = ['$http'];

    function UtilsProduct ($http) {

        var service = {
            setItemImage: setItemImage,
            updateItemImage: updateItemImage,
            getProductsWithFilters: getProductsWithFilters
        };

        return service;

        function setItemImage(product, file){
            var fd = new FormData();

            if(file[0]){
                fd.append("file", file[0]);
            }

            var stringProd = JSON.stringify(product);
            fd.append('product', new Blob([stringProd], {
                type: "application/json"
            }));

            return  $http({
                url: 'api/products',
                method: 'POST',
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined   //multipart/form-data
                },
                data: fd
            }).then(function(response){
                return response;
            })

        }

        function updateItemImage(announcement, file){
            var fd = new FormData();

            if(file[0]){
                fd.append("file", file[0]);
            }

            var stringProd = JSON.stringify(product);
            fd.append('product', new Blob([stringProd], {
                type: "application/json"
            }));

            return  $http({
                url: 'api/products',
                method: 'PUT',
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined   //multipart/form-data
                },
                data: fd
            }).then(function(response){
                return response;
            });
        }

        function getProductsWithFilters(productDto, page, size, sortBy){
            console.log(productDto);
            console.log(page);
            return $http({
                url: 'api/filtered_products',
                method: 'POST',
                data: productDto,
                params: {page: page, size: size, sort: sortBy}
            });
        }

    }
})();
