'use strict'

app.controller('LoginCtrl', function($scope, $http) {
	$scope.login = function() {
		let credentials = {
			user_name: $scope.username,
			password: $scope.password
		}

		console.log('credentials', credentials)
		$http
			.post('/api/login', credentials)
			.then(res => {
				console.log('login res', res)
			})
			.catch(console.error)
	}
})