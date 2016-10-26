'use strict'

app.controller('LoginCtrl', function($scope) {
	$scope.login = function() {
		let credentials = {
			user_name: $scope.username,
			password: $scope.password
		}

		console.log('credentials', credentials)
	}
})