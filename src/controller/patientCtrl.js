'use strict'

app.controller('PatientCtrl', function($scope, PatientData) {
	$scope.test = PatientData.getPatients()
})