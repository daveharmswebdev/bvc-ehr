'use strict'

app.controller('InterventionCtrl', function($scope, $routeParams, InterventionData) {
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
			intervention: $scope.intervention,
			intervention_note: $scope.intervention_note
		}

		console.log('intervention', intervention)
		InterventionData
			.createIntervention(intervention)
			.then( newIntervention => {
				$scope.intervention = ''
				$scope.intervention_note = ''
				// if (newIntervention.intervention === 'medication') {
					
				// }
				displayInterventions()
			})
	}

	displayInterventions()
})