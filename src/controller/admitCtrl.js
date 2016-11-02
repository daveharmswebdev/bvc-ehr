'use strict'

app.controller('AdmitCtrl', function($scope, $routeParams, $location, AdmitFactory, PatientData) {
	// populate patient dropdown
	PatientData
		.getPatients()
		.then(patients => {
			console.log('patients', patients)
			$scope.patients = patients
			console.log('$scope.patients', $scope.patients)
		})

	$scope.admit = () => {
		let admission = {
			patient_id: $scope.patientToBeAdmitted,
			admission_rn: 1,
			voluntary_status: $scope.voluntary_status,
			admitting_md: $scope.admitting_md,
			complaint: $scope.complaint,
			symptoms: $scope.symptoms,
			suicidal: $scope.suicidal || false,
			suicidal_plan: $scope.suicidal_plan,
			homicidal: $scope.homicidal || false,
			homicidal_who: $scope.homicidal_who,
			homicidal_plan: $scope.homicidal_plan,
			behavioral_health_hx: $scope.behavioral_health_hx,
			medical_hx: $scope.medical_hx,
			current_meds: $scope.current_meds,
			smoker: $scope.smoker || false
		}

		AdmitFactory
			.createAdmission(admission)
			.then(newAdmit => {
				console.log('new admit', newAdmit)
				$location.path('/dashboard')
			})
	}
})