'use strict'

app.controller('RegisterCtrl', function($scope, $http, $location) {
	$scope.reg = function() {
		let staff = {
			user_name: $scope.userName,
			last_name: $scope.lastName,
			first_name: $scope.firstName,
			middle_initial: $scope.middleInitial,
			role: $scope.role,
			security_level: $scope.securityLevel,
			unit: $scope.unit,
			password: $scope.password,
			confirmation: $scope.confirmation
		}

		$http
			.post('/api/staff', staff)
			.then(res => {
				console.log('res', res)
				$location.path('/login')
			})
			.catch(console.error)
	}
})