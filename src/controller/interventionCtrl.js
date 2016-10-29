'use strict'

app.controller('InterventionCtrl', function($scope, $routeParams, InterventionData, $location) {
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
			user_id: 1,
			intervention: $scope.intervention,
			intervention_note: $scope.intervention_note
		}

		console.log('intervention', intervention)
		InterventionData
			.createIntervention(intervention)
			.then( newIntervention => {
				$scope.intervention = ''
				$scope.intervention_note = ''
				if (newIntervention.intervention === 'medication') {
					$location.path(`/admission/${newIntervention.admission_id}/intervention/${newIntervention.intervention_id}/medication`)
				} else if (newIntervention.intervention === 'seclusion') {
					$location.path(`/admission/${newIntervention.admission_id}/intervention/${newIntervention.intervention_id}//seclusion`)
				} else {
					displayInterventions()
				}
			})
	}

	displayInterventions()
})