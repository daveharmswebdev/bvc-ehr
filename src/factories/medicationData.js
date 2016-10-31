'use strict'

app.factory('MedicationData', ($q, $http) => {
	const service = {}

	function getMedDoseRoute(med) {
		med.medDoseRoute = `${med.medication} ${med.dose}${med.units} ${med.route}`
		return med
	}

	function getUrl(med) {
		console.log('med', med)
		med.url = `/intervention/${med.intervention_id}/medication/${med.medication_id}`
		return med
	}

	function getReadableTimeStamp(med) {
		med.medication_time = new Date(med.medication_time).toString().split(' ').slice(1,5).join(' ')
		return med
	}

	function getNurse(med) {
		med.nurse = `${med.last_name}, ${med.first_name} RN`
		return med
	}

	service.getMedByInt = intervention => {
		console.log('intervention', intervention)
		return $q((resolve, reject) => {
			$http
				.get(`/api/medByIntervention/${intervention}`)
				.success(meds => {
					console.log('meds', meds)
					meds = meds
						.map(getUrl)
						.map(getMedDoseRoute)
						.map(getNurse)
						.map(getReadableTimeStamp)
					resolve(meds)
				})
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

	service.getSingleMed = id => {
		return $q((resolve, reject) => {
			$http
				.get(`/api/medication/${id}`)
				.success(med => resolve(med))
				.error(error => reject(error))
		})
	}

	service.editMedication = (id, newMed) => {
		return $q((resolve, reject) => {
			$http
				.put(`/api/medication/${id}`, newMed)
				.success(med => resolve(med))
				.error(error => reject(error))
		})
	}

	service.deleteById = id => {
		return $q((resolve, reject) => {
			$http
				.delete(`/api/medication/${id}`)
				.success(response => resolve(response))
				.error(error => reject(error))
		})
	}

	return service
})