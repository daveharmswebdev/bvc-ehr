'use strict'

app.controller('EditMedicationCtrl', ($scope, $routeParams, $location, MedicationData) => {
	MedicationData
		.getSingleMed($routeParams.medicationId)
		.then(med => {
			console.log('med', med)
			$scope.medication = med.medication
			$scope.dose = med.dose
			$scope.units = med.units
			$scope.route = med.route
		})
	

	$scope.edit = () => {
		const edit = {
			medication: $scope.medication,
			dose: $scope.dose,
			units: $scope.units,
			route: $scope.route
		}

		MedicationData
			.editMedication($routeParams.medicationId, edit)
			.then(() => $location.path(`/admission/${$routeParams.admissionId}/intervention/${$routeParams.interventionId}/medication`))
	}
})