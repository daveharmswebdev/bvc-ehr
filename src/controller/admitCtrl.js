'use strict'

app.controller('AdmitCtrl', function($scope, $routeParams) {
	$scope.admit = () => {
		let admission = {
			patient_id: $routeParams.patientId,
			voluntary_status: $scope.voluntary_status,
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

		console.log('new admit', admission)
	}
})