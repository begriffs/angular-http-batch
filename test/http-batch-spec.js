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
      batch(1, function () {
        $http.get('/foo');
      });
      $httpBackend.expectPOST('/batch').respond(200, '');
      $httpBackend.flush(1);
      $httpBackend.verifyNoOutstandingRequest();
    });
  });
}());
