'use strict'

app.controller('NavCtrl', ($rootScope, $scope, $localStorage) => {
	$rootScope.currentUser = $localStorage.user && $localStorage.user.user_name || 'No User Logged In'

	// console.log(typeof $localStorage.user.user_name !== 'undefined')

	$scope.navItems = [
		{
			name: "Register",
			url: '#/register'
		},
		{
			name: "Logout",
			url: "#/logout"
		},
		{
			name: "Login",
			url: "#/login"
		},
		{
			name: "Admission",
			url: "#/admission"
		},
		{
			name: "Patient",
			url: "#/newPatient"
		},
		{
			name: "Dashboard",
			url: "#/dashboard"
		},
	]
})