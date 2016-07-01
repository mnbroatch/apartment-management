"use strict;"


let express = require('express');
let Tenant = require('../models/tenant');

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
	Tenant.findByIdAndRemove(req.params.id, err => {
		res.status(err? 400:200).send(err);
	});
});

// router.route('/:tenantId/add-property')
// .put(function(req,res){
//
// 	Tenant.findByIdAndUpdate(req.params.tenantId, {property: req.body.id}, (err,savedTenant) => {
// 		res.status(err? 400:200).send(err || savedTenant);
// 	});
//
// });
//
// router.route('/:tenantId/remove-property')
// .put(function(req,res){
//
// 	Tenant.findByIdAndUpdate(req.params.tenantId, {$pull: {property: req.body.id}}, (err,removedTenant) => {
// 		res.status(err? 400:200).send(err || removedTenant);
// 	});
//
// });

 module.exports = router;

