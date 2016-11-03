'use strict'

app.controller('BrosetScoreCtrl', function($scope, $routeParams, BrosetData, $localStorage) {
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

	$scope.deleteScore = score => 
		BrosetData
			.deleteById(score.broset_id)
			.then(response => {
				console.log('response from delete', response)
				displayScores()
			})

	displayScores()
})