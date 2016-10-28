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

	service.getScoresByAdmission = admission => {
		return $q((resolve, reject) => {
			$http
				.get(`/api/brosetByAdmission/${admission}`)
				.success(scores => {
					scores = scores.map(getBrosetSum)
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

	return service
})