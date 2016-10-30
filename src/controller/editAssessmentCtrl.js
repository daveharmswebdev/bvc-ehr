'use strict'

app.controller('EditAssessmentCtrl', ($scope, $routeParams, $location, AssessmentData) => {
	AssessmentData
		.getSingleAssessment($routeParams.assessmentId)
		.then(assessment => {
			console.log('assessment', assessment)
			$scope.assessment = assessment
		})

		$scope.edit = () => {
			let newAssessment = $scope.assessment
			newAssessment.oriented_person = $scope.assessment.oriented_person || false
			newAssessment.oriented_place = $scope.assessment.oriented_place || false
			newAssessment.oriented_time = $scope.assessment.oriented_time || false
			newAssessment.oriented_purpose = $scope.assessment.oriented_purpose || false
			newAssessment.suicidal = $scope.assessment.suicidal || false
			newAssessment.homicidal = $scope.assessment.homicidal || false
			newAssessment.nurse_assessing = 1		

			AssessmentData
				.editAssessment($routeParams.assessmentId, newAssessment)
				.then(a => {
					console.log('a', a)
					$location.path(`/admission/${$routeParams.admissionId}/assessment`)
				})	
		}
})