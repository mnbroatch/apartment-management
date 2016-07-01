"use strict;"

angular.module('appName')
.controller('tenantController', function($scope,$http,tenantService) {


	{
		$scope.tenantArray =[];

		tenantService.getAll()
		.then( function(tenants){
			if(tenants) $scope.tenantArray.push(...tenants);
		})
		.catch( err => {
			console.log(err);
		});
	}



	$scope.addOneTenant = function(tenant){
		tenantService.addOne(tenant)
		.then( function(newTenant){
			if(newTenant) $scope.tenantArray.push(newTenant);
		})
		.catch( err => {
			console.log(err);
		});
	}

	$scope.removeOneTenant = function(tenant){
		let index = $scope.tenantArray.indexOf(tenant);
		tenantService.removeOne(tenant)
		.then( function(){
			$scope.tenantArray.splice(index,1);
		})
		.catch( err => {
			console.log(err);
		});
	}

	$scope.editOneTenant = function(editedTenant){
		tenantService.editOne(editedTenant)
		.then( function(updatedTenant){
			console.log("edited");
		})
		.catch( err => {
			console.log(err);
		});
	}


});



