'use strict'

app.factory('InterventionData', ($q, $http) => {
	const service = {}

	function getUrl(intervention) {
		intervention.url = `/#/admission/${intervention.admission_id}/intervention/${intervention.intervention_id}/edit`
		return intervention
	}

	function getReadableTimeStamp(intervention) {
		intervention.intervention_time = new Date(intervention.intervention_time).toString().split(' ').slice(1,5).join(' ')
		return intervention
	}

	function getNurse(intervention) {
		intervention.nurse = `${intervention.last_name}, ${intervention.first_name} RN`
		return intervention
	}

	service.getInterventionByAdmissionId = admission => {
		return $q((resolve, reject) => {
			$http
				.get(`/api/interventionByAdmission/${admission}`)
				.success(intervention => {
					intervention = intervention
						.map(getUrl)
						.map(getReadableTimeStamp)
						.map(getNurse)	
					resolve(intervention)
				})
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

	service.editIntervention = (id, edit) => {
		return $q((resolve, reject) => {
			$http
				.put(`/api/intervention/${id}`, edit)
				.success(intervention => resolve(intervention))
				.error(error => reject(error))
		})
	}

	return service
})