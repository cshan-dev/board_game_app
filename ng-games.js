'use strict';

var myApp = angular.module('sampleapp', []);

myApp.controller('GameController', ['$scope', '$http', function($scope, $http) {
    $scope.andy = "awesome";
    $scope.games = [];
    $http.get('api/games').success(function(data, status, headers, config) {
        $scope.games = data;
    }).error(function(data, status, headers, config) {});

    $scope.click = function() {
        console.log("Clicked");
        $http.get('api/games', {
            params: {
                'average': $scope.average_input,
                'rank': $scope.rank_input,
                'maxplayers': $scope.maxplayers_input,
                'minplayers': $scope.minplayers_input,
                'maxplayingtime': $scope.maxplayingtime_input,
                'minplayingtime': $scope.minplayingtime_input,
                'random_number': $scope.random_number_input
            }
        }).success(function(data, status, headers, config) {
            $scope.games = data;
        }).error(function(data, status, headers, config) {});

    };
}]);