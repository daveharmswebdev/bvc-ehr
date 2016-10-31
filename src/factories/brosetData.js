'use strict'

app.factory('BrosetData', ($q, $http) => {
	const service = {}

	function getBrosetSum(score) {
		let sum = 0
		sum += score.confused === true ? 1 : 0
		sum += score.irritable === true ? 1 : 0
		sum += score.boisterous === true ? 1 : 0
		sum += score.verbal_threats === true ? 1 : 0
		sum += score.physical_threats === true ? 1 : 0
		sum += score.attacking_furniture === true ? 1 : 0
		score.sum = sum
		return score
	}

	function getUrl(score) {
		score.url = `/#/admission/${score.admission_id}/broset/${score.broset_id}/edit`
		return score
	}

	function getReadableTimeStamp(score) {
		score.score_time = new Date(score.score_time).toString().split(' ').slice(1,5).join(' ')
		return score
	}

	function getNurse(score) {
		score.nurse = `${score.last_name}, ${score.first_name} RN`
		return score
	}

	service.getScoresByAdmission = admission => {
		return $q((resolve, reject) => {
			$http
				.get(`/api/brosetByAdmission/${admission}`)
				.success(scores => {
					scores = scores
						.map(getBrosetSum)
						.map(getUrl)
						.map(getReadableTimeStamp)
						.map(getNurse)
					resolve(scores)
				})
				.error(error => reject(error))
		})
	}

	service.createScore = newScore => {
		return $q((resolve, reject) => {
			$http
				.post('/api/broset', newScore)
				.success(response => resolve(response))
				.error(error => reject(error))
		})
	}

	service.getSingleScore = id => {
		return $q((resolve, reject) => {
			$http
				.get(`/api/broset/${id}`)
				.success(score => resolve(score))
				.error(error => reject(error))
		})
	}

	// service.editScore
	service.editScore = (id, newScore) => {
		console.log('newScore', newScore)
		return $q((resolve, reject) => {
			$http
				.put(`/api/broset/${id}`, newScore)
				.success(score => {
					console.log('score', score)
					resolve(score)
				})
				.error(error => reject(error))
		})
	}

	service.deleteById = id => {
		return $q((resolve, reject) => {
			$http
				.delete(`/api/broset/${id}`)
				.success(response => resolve(response))
				.error(error => reject(error))
		})
	}

	return service
})