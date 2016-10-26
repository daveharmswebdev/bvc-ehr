'use strict'

app.controller('RegisterCtrl', function($scope, $http) {
	$scope.reg = function() {
		let staff = {
			user_name: $scope.username,
			last_name: $scope.lastName,
			first_name: $scope.firstName,
			middle_initial: $scope.middleInitial,
			role: $scope.role,
			security_level: $scope.securityLevel,
			unit: $scope.unit,
			password: $scope.password
		}

		$http
			.post('/api/staff', staff)
			.then(res => {
				console.log('res', res)
			})
			.catch(console.error)
	}
})