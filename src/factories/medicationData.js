'use strict'

app.factory('MedicationData', ($q, $http) => {
	const service = {}

	service.getMedByInt = intervention => {
		console.log('intervention', intervention)
		return $q((resolve, reject) => {
			$http
				.get(`/api/medByIntervention/${intervention}`)
				.success(meds => resolve(meds))
				.error(error => reject(error))
		})
	}

	service.createMed = submission => {
		return $q((resolve, reject) => {
			$http
				.post('/api/medication', submission)
				.success(response => resolve(response))
				.error(error => reject(error))
		})
	}

	return service
})