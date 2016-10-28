'use strict'

app.factory('AdmitFactory', ($q, $http) => {
	const service = {}

	service.createAdmission = admission => {
		return $q((resolve, reject) => {
			$http
				.post('/api/admit', admission)
				.success(newAdmit => resolve(newAdmit))
				.error(error => reject(error))
		})
	}

	return service
})