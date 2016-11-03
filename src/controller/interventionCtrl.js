'use strict'

app.controller('InterventionCtrl', function($scope, $routeParams, InterventionData, $location, $localStorage) {
	const displayInterventions = function() {
		InterventionData
			.getInterventionByAdmissionId($routeParams.admissionId)
			.then(i => {
				console.log('i', i)
				$scope.interventions = i
			})
	}	


	$scope.intervene = () => {
		let intervention = {
			admission_id: $routeParams.admissionId,
			user_id: $localStorage.user.user_id,
			intervention: $scope.intervention,
			intervention_note: $scope.intervention_note
		}

		console.log('intervention', intervention)
		InterventionData
			.createIntervention(intervention)
			.then( newIntervention => {
				console.log('newIN', newIntervention)
				if (newIntervention.intervention === 'medication') {
					console.log('it is medication*******************')
					$location.path(`/admission/${newIntervention.admission_id}/intervention/${newIntervention.intervention_id}/medication`)
				} else if (newIntervention.intervention === 'seclusion') {
					$location.path(`/admission/${newIntervention.admission_id}/intervention/${newIntervention.intervention_id}//seclusion`)
				} else {
					$scope.intervention = ''
					$scope.intervention_note = ''
					displayInterventions()
				}
			})
	}

	$scope.deleteIntervention = intervention => {
		console.log('intervention', intervention)
		InterventionData
			.deleteById(intervention)
			.then(response => {
				console.log('response from delete', response)
				displayInterventions()
			})
	}
	displayInterventions()
})