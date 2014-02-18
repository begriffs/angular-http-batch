angular.module('begriffs.http-batch', [],
  ['$provide', '$httpProvider', function($provide, $httpProvider) {

    'use strict';

    $provide.factory('captureRequest',
      ['$q', function ($q) {
        console.log("Create captureRequest");
        return {
          request: function (config) {
            console.log(config);
            return $q.defer();
          },
          requestError: function (config) {
            console.log(config);
            return $q.defer();
          }
        };
      }]
    );
    $httpProvider.interceptors.push('captureRequest');

    $provide.factory('http-batch',
      ['$http', function ($http) {

        return function (batchEndpoint) {

          return function (f) {
            console.log($httpProvider.interceptors);

            f();

            $httpProvider.interceptors.pop();
            // wait for endpoint return
            // resolve promises in request queue
          };
        };
      }]
    );
  }]
);
