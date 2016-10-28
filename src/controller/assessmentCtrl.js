'use strict'

app.controller('AssessmentCtrl', function($scope, $routeParams) {
	$scope.assess = () => {
		let assessment = $scope.assessment
		assessment.oriented_person = $scope.assessment.oriented_person || false
		assessment.oriented_place = $scope.assessment.oriented_place || false
		assessment.oriented_time = $scope.assessment.oriented_time || false
		assessment.oriented_purpose = $scope.assessment.oriented_purpose || false
		assessment.suicidal = $scope.assessment.suicidal || false
		assessment.homicidal = $scope.assessment.homicidal || false
		assessment.admission_id = parseInt($routeParams.admissionId)

		console.log('assesment', assessment)
	}
})