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

	service.getScoresByAdmission = admission => {
		return $q((resolve, reject) => {
			$http
				.get(`/api/brosetByAdmission/${admission}`)
				.success(scores => {
					scores = scores.map(getBrosetSum).map(getUrl)
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
	// service.editScore = (id, newScore) => {
	// 	return $q((resolve, reject) => {
	// 		$http
	// 			.get()
	// 	})
	// }

	return service
})