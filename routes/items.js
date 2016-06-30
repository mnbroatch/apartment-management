"use strict;"


let express = require('express');
let Item = require('../models/item');

let router = express.Router();


router.route('/')
.get(function(req,res){
	Item.find({}, (err,items) => {
		res.status(err? 400:200).send(err || items);
	});
})
.post(function(req,res){
	let item = new Item(req.body);
	item.save((err,savedItem) => {
		res.status(err? 400:200).send(err || savedItem);
	});
});


router.route('/:id')
.get(function(req,res){
	Item.find({_id:req.params.id}, (err,item) => {
		res.status((err || !item)? 400:200).send(err || item[0]);
	});
})
.put(function(req,res){
	Item.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,savedItem) => {
		res.status(err? 400:200).send(err || savedItem);
	});
})
.delete(function(req,res){
	Item.findByIdAndRemove(req.params.id, err => {
		res.status(err? 400:200).send(err);
	});
});


module.exports = router;

