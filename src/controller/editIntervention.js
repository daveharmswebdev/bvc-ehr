'use strict'

app.controller('EditInterventionCtrl', ($scope, $routeParams, $location, InterventionData) => {
	InterventionData
		.getSingleIntervention($routeParams.interventionId)
		.then(intervention => {
			console.log('intervention', intervention)
			$scope.intervention = intervention.intervention
			$scope.intervention_note = intervention.intervention_note
		})

	$scope.edit = () => {
		const edit = {
			intervention: $scope.intervention,
			intervention_note: $scope.intervention_note
		}

		InterventionData
			.editIntervention($routeParams.interventionId, edit)
			.then(() => $location.path(`/admission/${$routeParams.admissionId}/intervention`))
	}
})