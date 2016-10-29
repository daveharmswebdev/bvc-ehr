'use strict'

app.controller('EditBrosetScoreCtrl', ($scope, $routeParams, $location, BrosetData) => {
	BrosetData
		.getSingleScore($routeParams.brosetId)
		.then(score => $scope.score = score)

	$scope.edit = () => {
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
			.editScore($routeParams.brosetId, newScore)
			.then(() => $location.path(`/admission/${$routeParams.admissionId}/broset`))		
	}
})