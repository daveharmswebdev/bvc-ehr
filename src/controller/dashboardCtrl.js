'use strict'

app.controller('DashboardCtrl', function($scope, $location, AdmitFactory) {
	AdmitFactory
		.getAdmissions()
		.then( admissions => {
			console.log('admissions', admissions)
			$scope.patients = admissions
		})

	$scope.goToAssess = patient => {
		console.log('patient assess', patient)
		$location.path(`/admission/${patient.admission_id}/assessment`)
	}
	$scope.goToBroset = patient => {
		console.log(patient.admission_id)
		$location.path(`/admission/${patient.admission_id}/broset`)
	}
})