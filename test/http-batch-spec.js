(function () {
  'use strict';

  var $httpBackend, $http, hBatch;
  beforeEach(function () {
    angular.mock.module('begriffs.http-batch');
    angular.mock.inject(['$httpBackend', '$http', 'http-batch', function (httpBackend, http, batch) {
      $httpBackend = httpBackend;
      $http = http;
      hBatch = batch;
    }]);
  });

  describe('http-batch', function () {

    it('loads', function () {
      expect(typeof hBatch).toEqual('function');
    });
  });
}());
