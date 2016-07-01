"use strict;"

angular.module('appName')
.service('propertyService', function($http){


	this.getAll = () => {
		return $http({
			method:'GET',
			url: '/api/properties'
		})
		.then( res => {
			if (res.data.length)
				return res.data;
		})
		.catch(err => {
			console.log('err: ', err);
		});
	}

	this.addOne = (property) => {
		return $http({
			method:'POST',
			url: '/api/properties',
			data: property
		})
		.then( res => {
			if (res.data){
				return res.data;
			}
		})
		.catch(err => {console.log('err: ', err)});
	}

	this.removeOne = (property) => {
		return $http({
			method:'DELETE',
			url: '/api/properties/' + property._id,
			data: property,
			headers: {"Content-Type": "application/json;charset=utf-8"}
		})
	}

	this.editOne = (property) => {
		return $http({
			method:'PUT',
			url: '/api/properties/' + property._id,
			data: property
		})
		.then( res => {
			if (res.data){
				return res.data;
			}
		})
		.catch(err => {console.log('err: ', err)});
	}


});

