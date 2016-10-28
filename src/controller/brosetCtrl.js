'use strict'

app.controller('BrosetScoreCtrl', function($scope, $routeParams, BrosetData) {
	const displayScores = function() {
		BrosetData
			.getScoresByAdmission($routeParams.admissionId)
			.then(scores => {
				$scope.scores = scores
				console.log('scores', scores)
			})
	}

	const clearForm = function() {
		$scope.confused = false
		$scope.irritable = false
		$scope.boisterous = false
		$scope.verbal_threats = false
		$scope.physical_threats = false
		$scope.attacking_furniture = false
	}

	$scope.score = () => {
		let newScore = {
			admission_id: parseInt($routeParams.admissionId),
			user_id: 1,
			confused: $scope.confused || false,
			irritable: $scope.irritable || false,
			boisterous: $scope.boisterous || false,
			verbal_threats: $scope.verbal_threats || false,
			physical_threats: $scope.physical_threats || false,
			attacking_furniture: $scope.attacking_furniture || false
		}

		BrosetData
			.createScore(newScore)
			.then(() => {
				clearForm()
				displayScores()
			})
	}

	displayScores()
})