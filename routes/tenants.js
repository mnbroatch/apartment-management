"use strict;"


let express = require('express');
let Tenant = require('../models/tenant');
let Property = require('../models/property');

let router = express.Router();


router.route('/')
.get(function(req,res){
	Tenant.find({}, (err,tenants) => {
		res.status(err? 400:200).send(err || tenants);
	});
})
.post(function(req,res){
	let tenant = new Tenant(req.body);
	tenant.save((err,savedTenant) => {
		res.status(err? 400:200).send(err || savedTenant);
	});
});


router.route('/:id')
.get(function(req,res){
	Tenant.find({_id:req.params.id}, (err,tenant) => {
		res.status((err || !tenant)? 400:200).send(err || tenant[0]);
	});
})
.put(function(req,res){
	Tenant.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,savedTenant) => {
		res.status(err? 400:200).send(err || savedTenant);
	});
})
.delete(function(req,res){
	Property.update({_id: req.body.property},{$pull:{tenant: req.params.id}})
	.then(function(){
		return Tenant.findByIdAndRemove(req.params.id, err=>{
			res.status(err? 400:200).send(err);
		});
	})
	.catch(function(err){
		res.status(err? 400:200).send(err);
	});
});

module.exports = router;

