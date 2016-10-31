'use strict'

app.controller('NavCtrl', ($scope) => {
	$scope.navItems = [
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