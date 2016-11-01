'use strict'

app.controller('EditAssessmentCtrl', ($scope, $routeParams, $location, AssessmentData, $localStorage) => {
	AssessmentData
		.getSingleAssessment($routeParams.assessmentId)
		.then(assessment => {
			console.log('assessment', assessment)
			$scope.assessment = assessment
		})

		$scope.edit = () => {
			let newAssessment = {
				oriented_person: $scope.assessment.oriented_person || false,
				oriented_place: $scope.assessment.oriented_place || false,
				oriented_time: $scope.assessment.oriented_time || false,
				oriented_purpose: $scope.assessment.oriented_purpose || false,
				suicidal: $scope.assessment.suicidal || false,
				suicidal_plan: $scope.assessment.suicidal_plan,
				homicidal: $scope.assessment.homicidal || false,
				homicidal_plan: $scope.assessment.homicidal_plan,
				visual_hallucinations: $scope.assessment.visual_hallucinations,
				audio_hallucinations: $scope.assessment.audio_hallucinations,
				tactile_hallucinations: $scope.assessment.tactile_hallucinations,
				hallucination_comments: $scope.assessment.hallucination_comments,
				affect: $scope.assessment.affect,
				appetite: $scope.assessment.appetite,
				appearance: $scope.assessment.appearance,
				speech: $scope.assessment.speech,
				nurse_assessing: $localStorage.user.user_id,		
			}

			AssessmentData
				.editAssessment($routeParams.assessmentId, newAssessment)
				.then(a => {
					console.log('a', a)
					$location.path(`/admission/${$routeParams.admissionId}/assessment`)
				})	
		}
})