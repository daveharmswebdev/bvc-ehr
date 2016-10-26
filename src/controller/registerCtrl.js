'use strict'

app.controller('RegisterCtrl', function($scope, $http) {
	$scope.reg = function() {
		let staff = {
			last_name: $scope.registration.lastName,
			first_name: $scope.registration.firstName,
			middle_initial: $scope.registration.middleInitial,
			role: $scope.registration.role,
			security_level: $scope.registration.securityLevel
		}

		$http
			.post('/api/staff', staff)
			.then(res => {
				console.log('res', res)
			})
			.catch(console.error)
	}
})