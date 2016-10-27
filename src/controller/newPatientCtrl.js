'use strict'

app.controller('NewPatientCtrl', function($scope) {
	$scope.createPatient = () => console.log('patient', $scope.patient)
})