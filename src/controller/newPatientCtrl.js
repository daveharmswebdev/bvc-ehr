'use strict'

app.controller('NewPatientCtrl', function($scope, PatientData, $location) {
	$scope.createPatient = () => {
		PatientData
			.createPatient($scope.patient)
			.then(newPatient => {
				console.log('New Patient', newPatient)
				$location.path('/dashboard')
			})
	}
})