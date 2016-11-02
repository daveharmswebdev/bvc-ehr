'use strict'

app.controller(
	'ReportCtrl',
	($scope, $routeParams, AdmitFactory, BrosetData, AssessmentData) => {
		AdmitFactory
			.getAdmissionById($routeParams.admissionId)
			.then(admission => {
				$scope.patient = admission
			})

		BrosetData
			.getScoresByAdmission($routeParams.admissionId)
			.then(scores => {
				$scope.scores = scores
			})

		AssessmentData
			.getAssessmentsByAdmission($routeParams.admissionId)
			.then(assessments => {
				console.log('assessments', assessments)
				$scope.assessments = assessments 
			})
	})