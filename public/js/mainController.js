"use strict;"

angular.module('appName')
.controller('mainController', function($scope,propertyService,tenantService){

		$scope.propertyArray =[];

		propertyService.getAll()
		.then( function(properties){
			if(properties) $scope.propertyArray.push(...properties);
		})
		.catch( err => {
			console.log(err);
		});

		$scope.tenantArray =[];

		tenantService.getAll()
		.then( function(tenants){
			if(tenants) $scope.tenantArray.push(...tenants);
		})
		.catch( err => {
			console.log(err);
		});

});

