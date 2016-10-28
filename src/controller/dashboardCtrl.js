'use strict'

app.controller('DashboardCtrl', function($scope, $location, AdmitFactory) {
	AdmitFactory
		.getAdmissions()
		.then( admissions => {
			console.log('admissions', admissions)
			$scope.patients = admissions
		})

	$scope.goToAssess = patient => console.log('patient assess', patient)
	$scope.goToBroset = patient => {
		console.log(patient.admission_id)
		$location.path(`/broset/${patient.admission_id}`)
	}
})