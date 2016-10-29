'use strict'

app.factory('AssessmentData', ($q, $http) => {
	const service = {}

	service.getAssessmentsByAdmission = admission => {
		return $q((resolve, reject) => {
			$http
				.get(`/api/assessmentsByAdmissionId/${admission}`)
				.success(a => resolve(a))
				.error(error => reject(error))
		})
	}

	service.createAssessments = submission => {
		return $q((resolve, reject) => {
			$http
				.post('/api/assess', submission)
				.success(response => resolve(response))
				.error(error => reject(error))
		})
	}

	return service
})