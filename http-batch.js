angular.module('begriffs.http-batch', []).
  factory('http-batch', ['$http', '$q', function ($http, $q) {
    'use strict';

    return function (batchEndpoint) {

      return function (f) {
        var requestQueue = [];

        function enqueueRequest(r) {

        }

        // set up interceptor

        f();

        // tear down interceptor
        // wait for endpoint return
        // resolve promises in request queue
      };
    };

  }]);
