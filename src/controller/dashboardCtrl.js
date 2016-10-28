'use strict'

app.controller('DashboardCtrl', function($scope, PatientData) {
	PatientData
		.getPatients()
		.then( patients => {
			$scope.patients = patients
		})
})