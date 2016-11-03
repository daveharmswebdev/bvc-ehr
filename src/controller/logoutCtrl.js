'use strict'

app.controller('LogoutCtrl', function($scope, $http, $location, $localStorage, $rootScope) {

	$scope.logout = function() {
		console.log('logout logout')
		$http
			.get('/api/logout', {})
			.then(response => {
				$localStorage.user = {}
				$rootScope.currentUser = null
				console.log(response.status)
				$location.path('/login')
			})
			.catch(console.error)
	}
	
})