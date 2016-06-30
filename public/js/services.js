"use strict;"

angular.module('appName')
.service('itemService', function($http){


	this.getAll = () => {
		return $http({
			method:'GET',
			url: '/api/items'
		})
		.then( res => {
			if (res.data.length)
				return res.data;
		})
		.catch(err => {
			console.log('err: ', err);
		});
	}

	this.addOne = (item) => {
		return $http({
			method:'POST',
			url: '/api/items',
			data: item
		})
		.then( res => {
			if (res.data){
				return res.data;
			}
		})
		.catch(err => {console.log('err: ', err)});
	}

	this.removeOne = (item) => {
		return $http({
			method:'DELETE',
			url: '/api/items/' + item._id
		});
	}

	this.editOne = (item) => {
		return $http({
			method:'PUT',
			url: '/api/items/' + item._id,
			data: item
		})
		.then( res => {
			if (res.data){
				return res.data;
			}
		})
		.catch(err => {console.log('err: ', err)});
	}


});

