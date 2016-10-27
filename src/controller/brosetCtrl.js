'use strict'

app.controller('BrosetScoreCtrl', function($scope, $routeParams) {
	$scope.score = () => {
		let newScore = {
			intervention: parseInt($routeParams.interventionId),
			confused: $scope.confused || false,
			irritable: $scope.irritable || false,
			boisterous: $scope.boisterous || false,
			verbal_threats: $scope.verbal_threats || false,
			physical_threats: $scope.physical_threats || false,
			attacking_furniture: $scope.attacking_furniture || false
		}

		console.log('new score', newScore)
	}
})