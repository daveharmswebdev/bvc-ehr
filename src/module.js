'use strict'

const app = angular.module('bvcehr', ['ngRoute'])

app.config(function($routeProvider) {

	$routeProvider
		.when('/login', {
			templateUrl: './views/login.html',
			controller: 'LoginCtrl'
		})
		.when('/admission/:patientId', {
			templateUrl: './views/admit.html',
			controller: 'AdmitCtrl'
		})
		.when('/admission/:admissionId/assessment', {
			templateUrl: './views/assessment.html',
			controller: 'AssessmentCtrl'
		})
		.when('/admission/:admissionId/assessment/:assessmentId/edit', {
			templateUrl: './views/assessmentEdit.html',
			controller: 'EditAssessmentCtrl'
		})
		.when('/admission/:admissionId/broset', {
			templateUrl: './views/broset.html',
			controller: 'BrosetScoreCtrl'
		})
		.when('/admission/:admissionId/broset/:brosetId/edit', {
			templateUrl: './views/brosetEdit.html',
			controller: 'EditBrosetScoreCtrl'
		})
		.when('/dashboard', {
			templateUrl: './views/dashboard.html',
			controller: 'DashboardCtrl'
		})
		.when('/admission/:admissionId/intervention', {
			templateUrl: './views/intervention.html',
			controller: 'InterventionCtrl'
		})
		.when('/admission/:admissionId/intervention/:interventionId/edit', {
			templateUrl: './views/interventionEdit.html',
			controller: 'EditInterventionCtrl'
		})
		.when('/admission/:admissionId/intervention/:interventionId/medication', {
			templateUrl: './views/medication.html',
			controller: 'MedicationCtrl'
		})
		.when('/newPatient', {
			templateUrl: './views/newPatient.html',
			controller: 'NewPatientCtrl'
		})
		.when('/note', {
			templateUrl: './views/note.html',
			controller: 'NoteCtrl'
		})
		.when('/patient', {
			templateUrl: './views/patient.html',
			controller: 'PatientCtrl'
		})
		.when('/safetyCheck', {
			templateUrl: './views/SafetyCheck.html',
			controller: 'SafetyCheckCtrl'
		})
		.when('/seclusion/:interventionId', {
			templateUrl: './views/seclusion.html',
			controller: 'SeclusionCtrl'
		})
		.when('/register', {
			templateUrl: './views/register.html',
			controller: 'RegisterCtrl'
		})
		.otherwise({
			redirectTo: '/login'
		})
})