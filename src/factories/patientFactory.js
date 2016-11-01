'use strict'

app.factory('PatientData', ($q, $http) => {
	const service = {}

	function getFullName(patient) {
		patient.fullName = `${patient.last_name}, ${patient.first_name} ${patient.middle_initial}`
		return patient
	}

	function sortByFullName(a, b) {
		a = a.fullName.toUpperCase()
		b = b.fullName.toUpperCase()
		if (a < b) return -1
		if (a > b) return 1
		return 0
  }

	service.getPatients = () => {
		return $q((resolve, reject) => {
			$http
				.get('/api/patient')
				.success(patients => {
					patients = patients
						.map(getFullName)
						.sort(sortByFullName)
					resolve(patients)
				})
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