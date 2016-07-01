"use strict;"

let express = require('express');
let Property = require('../models/property');
let Tenant = require('../models/tenant');

let router = express.Router();




router.route('/')
.get(function(req,res){
	Property.find({}, (err,properties) => {
		res.status(err? 400:200).send(err || properties);
	});
})
.post(function(req,res){
	let property = new Property(req.body);
	property.save((err,savedProperty) => {
		res.status(err? 400:200).send(err || savedProperty);
	});
});


router.route('/:id')
.get(function(req,res){
	Property.findById(req.params.id, (err,property) => {
		res.status((err || !property)? 400:200).send(err || property[0]);
	});
})
.put(function(req,res){
	Property.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,savedProperty) => {
		res.status(err? 400:200).send(err || savedProperty);
	});
})
.delete(function(req,res){
	Property.findByIdAndRemove(req.params.id, err => {
		res.status(err? 400:200).send(err);
	});
});



// promise practice got a little messy :(

router.route('/:propertyId/add-tenant/:tenantId')
.put(function(req,res){

	let propertyPromise = Property.findById(req.params.propertyId)
	.exec()

	let tenantPromise = Tenant.findByIdAndUpdate(req.params.tenantId,{property: req.params.propertyId}, {new:true})
	.exec()

	Promise.all([propertyPromise,tenantPromise])
	.then(function(propertyAndTenant){
		if (propertyAndTenant[0].tenants.length >= propertyAndTenant[0].maxTenants){
			return Promise.reject('Max Tenants Exceeded. Tenant not added.');
		}
		else {
			propertyAndTenant[0].tenants.push(propertyAndTenant[1]._id);
			return propertyAndTenant[0].save()
			.then(function(){
				return propertyAndTenant;
			});
		}
	})
	.then(function(propertyAndTenant){
		return res.send(propertyAndTenant);
	})
	.catch(function(err){
		res.send(err);
	});
});


router.route('/:propertyId/remove-tenant/:tenantId')
.put(function(req,res){

	let tenantPromise = Tenant.findById(req.params.tenantId)
	.exec()

	let propertyPromise = Property.findByIdAndUpdate(req.params.propertyId,{$pull: {tenants: req.params.tenantId}}, {new:true})
	.exec()

	Promise.all([propertyPromise,tenantPromise])
	.then(function(propertyAndTenant){

		propertyAndTenant[1].property = null;
		return propertyAndTenant[1].save()
		.then(function(){
			return propertyAndTenant;
		});
	})
	.then(function(propertyAndTenant){
		return res.send(propertyAndTenant);
	})
	.catch(function(err){
		res.send(err);
	});
});

module.exports = router;

