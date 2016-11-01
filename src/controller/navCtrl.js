'use strict'

app.controller('NavCtrl', ($scope, $localStorage) => {
	// $scope.currentUser = ($localStorage.user.user_name) ? $localStorage.user.user_name : 'No User Logged In'

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