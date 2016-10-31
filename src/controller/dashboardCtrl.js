'use strict'

app.controller('DashboardCtrl', function($scope, $location, AdmitFactory) {
	function displayAdmissions() {
		AdmitFactory
			.getAdmissions()
			.then( admissions => {
				console.log('admissions', admissions)
				$scope.admissions = admissions
			})
	}

	$scope.goToAssess = admission => {
		console.log('admission assess', admission)
		$location.path(`/admission/${admission.admission_id}/assessment`)
	}
	$scope.goToBroset = admission => {
		console.log(admission.admission_id)
		$location.path(`/admission/${admission.admission_id}/broset`)
	}
	$scope.goToIntervention = admission => {
		$location.path(`/admission/${admission.admission_id}/intervention`)
	}
	$scope.deleteAdmission = admission => {
		AdmitFactory
			.deleteById(admission.admission_id)
			.then(() => displayAdmissions())
	}

	displayAdmissions()
})