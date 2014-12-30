'use strict';

angular.module('stocks').controller('StockrecordsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Stockrecords',
	function($scope, $stateParams, $location, Authentication, Stockrecords) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var stockrecord = new Stockrecords({
				price: this.price,
			});
			stockrecord.$save(function(response) {
				$location.path('stockrecords/' + response._id);

				$scope.price = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.findrecords = function() {
			$scope.stockrecords = Stockrecords.query();
		};

		$scope.findOne = function() {
			$scope.stockrecord = Stockrecords.get({
				stockrecordId: $stateParams.stockrecordId
			});
		};
	}
]);