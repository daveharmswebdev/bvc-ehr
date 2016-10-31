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

	service.getAdmissions = () => {
		return $q((resolve, reject) => {
			$http
				.get('/api/admit')
				.success(admissions => resolve(admissions))
				.error(error => reject(error))
		})
	}

	service.deleteById = id => {
		return $q((resolve, reject) => {
			$http
				.delete(`/api/admit/${id}`)
				.success(response => resolve(response))
				.error(error => reject(error))
		})			
	}

	return service
})