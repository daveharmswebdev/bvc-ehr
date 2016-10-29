'use strict'

app.controller('MedicationCtrl', function($scope, $routeParams, $location, MedicationData) {
	const displayMeds = () => 
		MedicationData
			.getMedByInt($routeParams.interventionId)
			.then(meds => {
				$scope.medications = meds
			})

	$scope.med = () => {
		let medication = {
			intervention_id: $routeParams.interventionId,
			medication: $scope.medication,
			dose: $scope.dose,
			units: $scope.units,
			route: $scope.route
		}

		console.log('medication being created', medication)
		MedicationData
			.createMed(medication)
			.then(response => {
				console.log('resppnse', response)
				$scope.medication = ''
				$scope.dose = ''
				$scope.units = ''
				$scope.route = ''
				displayMeds()
			})
	}

	$scope.goToIntervention = () => 
		$location.path(`/intervention/${$routeParams.interventionId}`)

	displayMeds()
})