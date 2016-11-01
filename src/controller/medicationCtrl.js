'use strict'

app.controller('MedicationCtrl', function($scope, $routeParams, $location, MedicationData, $localStorage) {
	function addAdmissionPrefix(med) {
		med.url = `/#/admission/${$routeParams.admissionId}${med.url}`
		return med
	}

	const displayMeds = () => 
		MedicationData
			.getMedByInt($routeParams.interventionId)
			.then(meds => {
				meds = meds.map(addAdmissionPrefix)
				$scope.medications = meds
			})

	$scope.med = () => {
		let medication = {
			intervention_id: $routeParams.interventionId,
			user_id: $localStorage.user.user_id,
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

	$scope.deleteMed = med => {
		MedicationData
			.deleteById(med.medication_id)
			.then(() => displayMeds())
	}

	$scope.goToIntervention = () => 
		console.log('$routeParms', $routeParams.admissionId)
		$location.path(`/admission/${$routeParams.admissionId}/intervention/`)

	displayMeds()
})