'use strict'

app.controller('EditInterventionCtrl', ($scope, $routeParams, $location, InterventionData) => {
	InterventionData
		.getSingleIntervention($routeParams.interventionId)
		.then(intervention => $scope.intervention = intervention)

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