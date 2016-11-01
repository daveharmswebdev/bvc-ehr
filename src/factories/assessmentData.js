'use strict'

app.factory('AssessmentData', ($q, $http) => {
	const service = {}


	function getUrl(assessment) {
		assessment.url = `/#/admission/${assessment.admission_id}/assessment/${assessment.assessment_id}/edit`
		return assessment
	}

	function getReadableTimeStamp(assessment) {
		assessment.charted_at = new Date(assessment.charted_at).toString().split(' ').slice(1,5).join(' ')
		return assessment
	}

	function getNurse(assessment) {
		assessment.nurse = `${assessment.last_name}, ${assessment.first_name} RN`
		return assessment
	}

	function getHallucinationsSummary(assessment) {
		let content = []
		if (assessment.visual_hallucinations !== null) content.push(`Visual Hallucinations: ${assessment.visual_hallucinations}.`)
		if (assessment.audio_hallucinations !== null) content.push(`Audio Hallucinations: ${assessment.audio_hallucinations}.`)
		if (assessment.tactile_hallucinations !== null) content.push(`Tactile Hallucinations: ${assessment.tactile_hallucinations}.`)
		if (assessment.hallucination_comments !== null) content.push(`Hallucination Comments: ${assessment.hallucination_comments}.`)
		assessment.hallucinations_summary = content.join(' ')
		return assessment
	}

	service.getAssessmentsByAdmission = admission => {
		return $q((resolve, reject) => {
			$http
				.get(`/api/assessmentsByAdmissionId/${admission}`)
				.success(assessment => {
					assessment = assessment
						.map(getUrl)
						.map(getReadableTimeStamp)
						.map(getNurse)
						.map(getHallucinationsSummary)
					resolve(assessment)
				})
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

	service.deleteById = id => {
		return $q((resolve, reject) => {
			$http
				.delete(`/api/assess/${id}`)
				.success(response => resolve(response))
				.error(error => reject(error))
		})
	}

	service.getSingleAssessment = id => {
		return $q((resolve, reject) => {
			$http
				.get(`/api/assess/${id}`)
				.success(assessment => resolve(assessment))
				.error(error => reject(error))
		})
	}

	service.editAssessment = (id, newAssessment) => {
		return $q((resolve, reject) => {
			$http
				.put(`/api/assess/${id}`, newAssessment)
				.success(assessment => {
					console.log('assessment', assessment)
					resolve(assessment)
				})
				.error(error => reject(error))
		})
	}

	return service
})