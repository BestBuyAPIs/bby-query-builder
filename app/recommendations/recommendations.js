'use strict';

angular.module('bby-query-mixer.recommendations').controller('RecommendationsCtrl', [
    '$scope',
    '$resource',
    'recommendationsConfig',
    function ($scope, $resource, recommendationsConfig) {
        $scope.results = {};
        $scope.remixResults = {};
        $scope.skuList = recommendationsConfig.skuList;

        var httpClient = function (query) {
            return $resource(query, {}, {
                jsonp_query: {
                    method: 'JSONP'
                }
            });
        };

        $scope.buildRecommendationsQuery = function () {
            return $scope.apiKey ? 'http://api.bestbuy.com/beta/products/trendingViewed?apiKey=' + $scope.apiKey + '&callback=JSON_CALLBACK' : '';
        };
        $scope.buildRemixQuery = function () {
            return ($scope.apiKey !== '') && ($scope.skuList !== '') ? 'http://api.remix.bestbuy.com/v1/products(sku in(' + $scope.skuList + '))?apiKey=' + $scope.apiKey + '&format=json&show=sku,name,description,image,addToCartUrl,salePrice&callback=JSON_CALLBACK' : '';
        }

        $scope.invokeRecommendationsQuery = function () {
            $scope.skuList = recommendationsConfig.skuList;
            $scope.results = "Running";
            $scope.remixResults = {};
            var query = $scope.buildRecommendationsQuery();

            var successFn = function (value) {
                $scope.results = value;
                $scope.buildSkuList();
            };
            var errorFn = function (httpResponse) {
                $scope.results = httpResponse;
            }
            httpClient(query).jsonp_query(successFn, errorFn);
        };

        $scope.invokeRemixQuery = function () {
            $scope.remixResults = "Running";
            var query = $scope.buildRemixQuery();
            var successFn = function (value) {
                $scope.remixResults = value;
            };
            var errorFn = function (httpResponse) {
                console.log('invokeRemixQuery failure: ' + JSON.stringify(httpResponse));
                $scope.remixResults = [
                    {error: httpResponse}
                ];
            }
            httpClient(query).jsonp_query(successFn, errorFn);
        }

        $scope.buildSkuList = function () {
            $scope.skuList = $scope.results.results.map(function (result) {
                return result.sku;
            }).join(',');
        };

        $scope.isRemixQueryButtonDisabled = function () {
            return ($scope.skuList == recommendationsConfig.skuList);
        }
    }
])
;