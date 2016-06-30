"use strict;"

angular.module('appName')
.controller('mainController', function($scope,$http,itemService) {
	//  this template assumes we want an array of items in mainController $scope.

	$scope.itemArray =[];

	itemService.getAll()
	.then( function(items){
		if(items) $scope.itemArray.push(...items);
	})
	.catch( err => {
		console.log(err);
	});



	$scope.addOneItem = function(item){
		itemService.addOne(item)
		.then( function(newItem){
			if(newItem) $scope.itemArray.push(newItem);
		})
		.catch( err => {
			console.log(err);
		});
	}

	$scope.removeOneItem = function(item){
		let index = $scope.itemArray.indexOf(item);
		itemService.removeOne(item)
		.then( function(){
			$scope.itemArray.splice(index,1);
		})
		.catch( err => {
			console.log(err);
		});
	}

	//  assumes uuid that doesn't change on edit
	$scope.editOneItem = function(editedItem,itemToEdit){
		let index = $scope.itemArray.indexOf(itemToEdit);
		editedItem._id = itemToEdit._id;
		itemService.editOne(editedItem)
		.then( function(updatedItem){
			$scope.itemArray[index] = updatedItem;
		})
		.catch( err => {
			console.log(err);
		});
	}


});



