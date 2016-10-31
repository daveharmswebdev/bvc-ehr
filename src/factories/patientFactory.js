'use strict'

app.factory('PatientData', ($q, $http) => {
	const service = {}

	service.getPatients = () => {
		return $q((resolve, reject) => {
			$http
				.get('/api/patient')
				.success(patients => resolve(patients))
				.error(error => reject(error))
		})
	}

	service.createPatient = submission => {
		return $q((resolve, reject) => {
			$http
				.post('/api/patient', submission)
				.success(newPatient => resolve(newPatient))
				.error(error => reject(error))
		})
	}

	service.deleteById = id => {
		return $q((resolve, reject) => {
			$http
				.delete(`/api/patient/${id}`)
				.success(response => resolve(response))
				.error(error => reject(error))
		})		
	} 

	return service
})