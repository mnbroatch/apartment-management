"use strict;"

angular.module('appName')
.controller('propertyController', function($scope,$http,propertyService) {

	$scope.addOneProperty = function(property){
		propertyService.addOne(property)
		.then( function(newProperty){
			if(newProperty) $scope.propertyArray.push(newProperty);
		})
		.catch( err => {
			console.log(err);
		});
	}

	$scope.removeOneProperty = function(property){
		let index = $scope.propertyArray.indexOf(property);
		propertyService.removeOne(property)
		.then( function(){
			$scope.propertyArray.splice(index,1);
		})
		.catch( err => {
			console.log(err);
		});
	}

	$scope.editOneProperty = function(editedProperty,propertyToEdit){
		propertyService.editOne(editedProperty)
		.then( function(updatedProperty){
			console.log('edited');
		})
		.catch( err => {
			console.log(err);
		});
	}


});

