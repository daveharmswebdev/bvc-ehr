'use strict'

app.controller(
	'ReportCtrl',
	($scope, $routeParams, AdmitFactory, BrosetData, AssessmentData, InterventionData) => {
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

		InterventionData
			.getInterventionByAdmissionId($routeParams.admissionId)
			.then(interventions => {
				console.log('interventions', interventions)
				$scope.interventions = interventions
			})

	})