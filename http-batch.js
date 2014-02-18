angular.module('begriffs.http-batch', [],
  ['$provide', '$httpProvider', function($provide, $httpProvider) {

    'use strict';

    var queuedRequests, capturing = false, allCaptured, captured, total;

    $provide.factory('captureRequest',
      ['$q', function ($q) {
        return {
          request: function (config) {
            if(!capturing) {
              return config || $q.when(config);
            }
            var d = $q.defer();

            queuedRequests.push({
              method: config.method.toLowerCase(),
              url: config.url,
              headers: config.headers,
              deferred: d
            });

            allCaptured.notify(queuedRequests.length / total);
            if(queuedRequests.length === total) {
              allCaptured.resolve();
            }

            return d.promise;
          }
        };
      }]
    );
    $httpProvider.interceptors.push('captureRequest');

    $provide.factory('http-batch',
      ['$http', '$q', function ($http, $q) {
        return function (batchEndpoint) {
          return function (n, f) {

            capturing = true;
            f();

            allCaptured.promise.then(
              function () {
                capturing = false;

                $http.post(batchEndpoint, {
                  ops: queuedRequests,
                  sequential: true
                });
              },
              function () { capturing = false; }
            );

            // resolve promises in request queue
          };
        };
      }]
    );
  }]
);
