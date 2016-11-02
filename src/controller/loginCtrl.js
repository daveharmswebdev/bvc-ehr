'use strict'

app.controller('LoginCtrl', function($rootScope, $scope, $http, $localStorage, $location) {
	$scope.login = function() {
		let credentials = {
			user_name: $scope.username,
			password: $scope.password
		}

		$http
			.post('/api/login', credentials)
			.then(res => {
				$localStorage.user = res.data
				$rootScope.currentUser = res.data.user_name
				$location.path('/dashboard')
			})
			.catch(console.error)
	}
})