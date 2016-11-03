'use strict'

app.controller('EditBrosetScoreCtrl', ($scope, $routeParams, $location, BrosetData, $localStorage) => {
	BrosetData
		.getSingleScore($routeParams.brosetId)
		.then(score => $scope.score = score)

	$scope.edit = () => {
		let newScore = {
			admission_id: parseInt($routeParams.admissionId),
			confused: $scope.score.confused || false,
			irritable: $scope.score.irritable || false,
			boisterous: $scope.score.boisterous || false,
			verbal_threats: $scope.score.verbal_threats || false,
			physical_threats: $scope.score.physical_threats || false,
			attacking_furniture: $scope.score.attacking_furniture || false
		}

		BrosetData
			.editScore($routeParams.brosetId, newScore)
			.then(() => $location.path(`/admission/${$routeParams.admissionId}/broset`))		
	}
})