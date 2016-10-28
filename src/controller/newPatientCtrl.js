'use strict'

app.controller('NewPatientCtrl', function($scope, PatientData) {
	$scope.createPatient = () => {
		PatientData
			.createPatient($scope.patient)
			.then(newPatient => console.log('New Patient', newPatient))
	}
})