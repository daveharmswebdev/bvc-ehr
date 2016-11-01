'use strict'

app.controller('AssessmentCtrl', function($scope, $routeParams, AssessmentData, $localStorage) {
	const displayAssessments = function() {
		AssessmentData
			.getAssessmentsByAdmission($routeParams.admissionId)
			.then(a => {
				console.log('a', a)
				$scope.assessments = a
			})
	}

	$scope.assess = () => {
		let assessment = $scope.assessment
		assessment.oriented_person = $scope.assessment.oriented_person || false
		assessment.oriented_place = $scope.assessment.oriented_place || false
		assessment.oriented_time = $scope.assessment.oriented_time || false
		assessment.oriented_purpose = $scope.assessment.oriented_purpose || false
		assessment.suicidal = $scope.assessment.suicidal || false
		assessment.homicidal = $scope.assessment.homicidal || false
		assessment.nurse_assessing = $localStorage.user.user_id
		assessment.admission_id = parseInt($routeParams.admissionId)

		console.log('assesment', assessment)
		AssessmentData
			.createAssessments(assessment)
			.then(() => {
				$scope.assessment = {}
				displayAssessments()
			})
	}

	$scope.deleteAssessment = assessment => 
		AssessmentData
			.deleteById(assessment.assessment_id)
			.then(() => displayAssessments())

	displayAssessments()
})