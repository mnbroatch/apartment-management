"use strict;"

angular.module('appName')
.service('tenantService', function($http){


	this.getAll = () => {
		return $http({
			method:'GET',
			url: '/api/tenants'
		})
		.then( res => {
			if (res.data.length)
				return res.data;
		})
		.catch(err => {
			console.log('err: ', err);
		});
	}

	this.addOne = (tenant) => {
		return $http({
			method:'POST',
			url: '/api/tenants',
			data: tenant
		})
		.then( res => {
			if (res.data){
				return res.data;
			}
		})
		.catch(err => {console.log('err: ', err)});
	}

	this.removeOne = (tenant) => {
		return $http({
			method:'DELETE',
			url: '/api/tenants/' + tenant._id
		});
	}

	this.editOne = (tenant) => {
		return $http({
			method:'PUT',
			url: '/api/tenants/' + tenant._id,
			data: tenant
		})
		.then( res => {
			if (res.data){
				return res.data;
			}
		})
		.catch(err => {console.log('err: ', err)});
	}

	this.addProperty = () => {
		return $http({
			method:'PUT',
			url: '/api/tenants/:tenantId/add-property/:propertyId',
			data: {property: propertyId}
		})
		.then( res => {
			if (res.data){
				return res.data;
			}
		})
		.catch(err => {console.log('err: ', err)});
	}



});

