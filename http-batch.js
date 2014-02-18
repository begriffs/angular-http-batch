angular.module('begriffs.http-batch', [],
  ['$provide', '$httpProvider', function($provide, $httpProvider) {

    'use strict';

    var queuedRequests = [], capturing = false;

    $provide.factory('captureRequest',
      ['$q', function ($q) {
        return {
          request: function (config) {
            console.log('capturing', capturing);
            if(!capturing) {
              return config || $q.when(config);
            }
            var d = $q.defer();

            console.log('capture', queuedRequests);

            queuedRequests.push({
              method: config.method.toLowerCase(),
              url: config.url,
              headers: config.headers,
              deferred: d
            });
            console.log('capture', queuedRequests);
            return d.promise;
          }
        };
      }]
    );
    $httpProvider.interceptors.push('captureRequest');

    $provide.factory('http-batch',
      ['$http', function ($http) {
        return function (batchEndpoint) {
          return function (f) {

            console.log('pre-f', queuedRequests);

            capturing = true;
            f();
            capturing = false;

            console.log('post-f', queuedRequests);

            console.log(batchEndpoint);

            $http.post(batchEndpoint, {
              ops: queuedRequests,
              sequential: true
            });
            // resolve promises in request queue
          };
        };
      }]
    );
  }]
);
