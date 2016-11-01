'use strict'

app.controller('LoginCtrl', function($scope, $http, $localStorage) {
	$scope.login = function() {
		let credentials = {
			user_name: $scope.username,
			password: $scope.password
		}

		console.log('credentials', credentials)
		$http
			.post('/api/login', credentials)
			.then(res => {
				$localStorage.user = res.data
				console.log('local storage', $localStorage.user)
			})
			.catch(console.error)
	}
})