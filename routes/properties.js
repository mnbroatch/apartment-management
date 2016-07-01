"use strict;"

let express = require('express');
let Property = require('../models/property');
let Tenant = require('../models/tenant');

let router = express.Router();


console.log(Property.removeTenantFromProperty);


router.route('/')
.get(function(req,res){
	Property.find({})
	.populate('tenants')
	.exec( (err,properties) => {
		console.log(properties);
		res.status(err? 400:200).send(err || properties);
	});
})








.post(function(req,res){
	let property = new Property(req.body);
	console.log('here');
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
	console.log(req);
	Tenant.update({_id: {$in: req.body.tenants}}, {property:null}, {multi:true})
	.then(function(){
		return Property.findByIdAndRemove(req.params.id, err=>{
			res.status(err? 400:200).send(err);
		});
	})
});



router.route('/:propertyId/add-tenant/:tenantId')
.put(function(req,res){
	Property.addTenantToProperty(req.params.propertyId,req.params.tenantId, function(err,savedProperty){
		res.status(err? 400:200).send(err || savedProperty);
	});
});


router.route('/:propertyId/remove-tenant/:tenantId')
.put(function(req,res){
	Property.removeTenantFromProperty(req.params.propertyId,req.params.tenantId, function(err,savedProperty){
		res.status(err? 400:200).send(err || savedProperty);
	});
});

module.exports = router;

