'use strict'

app.factory('InterventionData', ($q, $http) => {
	const service = {}

	service.getInterventionByAdmissionId = admission => {
		return $q((resolve, reject) => {
			$http
				.get(`/api/interventionByAdmission/${admission}`)
				.success(i => resolve(i))
				.error(error => reject(error))
		})
	}

	service.createIntervention = submission => {
		return $q((resolve, reject) => {
			$http
				.post('/api/intervention', submission)
				.success(response => resolve(response))
				.error(error => reject(error))
		})
	}

	service.getSingleIntervention = id => {
		return $q((resolve, reject) => {
			$http
				.get(`/api/intervention/${id}`)
				.success(intervention => resolve(intervention))
				.error(error => reject(error))
		})
	}

	return service
})