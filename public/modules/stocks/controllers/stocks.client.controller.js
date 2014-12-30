'use strict';

angular.module('stocks').controller('StocksController', ['$scope', '$stateParams', '$location', 'Authentication', 'Stocks',
	function($scope, $stateParams, $location, Authentication, Stocks, StockRecords) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var stock = new Stocks({
				title: this.title,
				code: this.code,
			});
			stock.$save(function(response) {
				$location.path('stocks/' + response._id);

				$scope.title = '';
				$scope.code = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(stock) {
			if (stock) {
				stock.$remove();

				for (var i in $scope.stocks) {
					if ($scope.stocks[i] === stock) {
						$scope.stocks.splice(i, 1);
					}
				}
			} else {
				$scope.stock.$remove(function() {
					$location.path('stocks');
				});
			}
		};

		$scope.update = function() {
			var stock = $scope.stock;

			stock.$update(function() {
				$location.path('stocks/' + stock._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			//console.log(angular.toJson($location, true));
			//console.log($location.path());

			$scope.stocks = Stocks.query();
		};

		$scope.findOne = function() {
			$scope.stock = Stocks.get({
				stockId: angular.copy($stateParams.stockId)
			});
		};

		$scope.findrecords = function() {
			$scope.stocks = Stocks.query({
				stockId: $stateParams.stockId,
				records: 'records'
			});
		};
	}
]);