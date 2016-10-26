'use strict'

const app = angular.module('bvcehr', ['ngRoute'])

app.config(function($routeProvider) {

	$routeProvider
		.when('/login', {
			templateUrl: './views/login.html',
			controller: 'LoginCtrl'
		})
		.when('/register', {
			templateUrl: './views/register.html',
			controller: 'RegisterCtrl'
		})
		.otherwise({
			redirectTo: '/register'
		})
})