'use strict'

const app = angular.module('bvcehr', ['ngRoute'])

app.config(function($routeProvider) {

	$routeProvider
		.when('/login', {
			templateUrl: './views/login.html',
			controller: 'LoginCtrl'
		})
		.when('/admit/:patientId', {
			templateUrl: './views/admit.html',
			controller: 'AdmitCtrl'
		})
		.when('/assessment/:admissionId', {
			templateUrl: './views/assessment.html',
			controller: 'AssessmentCtrl'
		})
		.when('/broset/:interventionId', {
			templateUrl: './views/broset.html',
			controller: 'BrosetScoreCtrl'
		})
		.when('/dashboard', {
			templateUrl: './views/dashboard.html',
			controller: 'DashboardCtrl'
		})
		.when('/intervention/:admissionId', {
			templateUrl: './views/intervention.html',
			controller: 'InterventionCtrl'
		})
		.when('/medication', {
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
		.when('/seclusion', {
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