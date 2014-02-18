(function () {
  'use strict';

  var $httpBackend, $http, batch;
  beforeEach(function () {
    angular.mock.module('begriffs.http-batch');
    angular.mock.inject(['$httpBackend', '$http', 'http-batch', function (httpBackend, http, hBatch) {
      $httpBackend = httpBackend;
      $http = http;
      batch = hBatch('/batch');
    }]);
  });

  describe('http-batch', function () {
    it('reroutes through batch endpoint', function () {
      expect(typeof batch).toEqual('function');
      batch(function () {
        $http.get('/foo');
      });
      $http.post('/batch');
      $httpBackend.expectPOST('/batch');
      $httpBackend.flush(1);
      $httpBackend.verifyNoOutstandingRequest();
    });
  });
}());
