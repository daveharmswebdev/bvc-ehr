'use strict'

app.factory('AdmitFactory', ($q, $http) => {
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

  function getReportUrl(patient) {
  	patient.report_url = `/#/report/${patient.admission_id}`
  	return patient
  }

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
				.success(admissions => {
					admissions = admissions.map(getReportUrl)
					resolve(admissions)
				})
				.error(error => reject(error))
		})
	}

	service.getAdmissionById = id => {
		return $q((resolve, reject) => {
			$http
				.get(`/api/admit/${id}`)
				.success(admit => {
					admit = getFullName(admit)
					resolve(admit)
				})
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