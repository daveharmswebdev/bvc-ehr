'use strict'

app.controller('MedicationCtrl', function($scope, $routeParams) {
	$scope.med = () => {
		let medication = {
			intervention_id: $routeParams.interventionId,
			medication: $scope.medication,
			dose: $scope.dose,
			units: $scope.units,
			route: $scope.route
		}

		console.log('medication', medication)
	}
})