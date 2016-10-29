'use strict'

app.controller('MedicationCtrl', function($scope, $routeParams, MedicationData) {
	const displayMeds = () => 
		MedicationData
			.getMedByInt($routeParams.interventionId)
			.then(meds => $scope.medications = meds)

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

	displayMeds()
})