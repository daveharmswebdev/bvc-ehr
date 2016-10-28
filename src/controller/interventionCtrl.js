'use strict'

app.controller('InterventionCtrl', function($scope, $routeParams) {
	$scope.intervene = () => {
		let intervention = {
			admission_id: $routeParams.admissionId,
			intervention: $scope.intervention,
			intervention_note: $scope.intervention_note
		}

		console.log('intervention', intervention)
	}
})