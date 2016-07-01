let mongoose = require('mongoose');
let Tenant = require('./tenant');

mongoose.Promise = Promise;

let propertySchema = new mongoose.Schema({
	name: {type:String, required:true},
	rent: {type:Number, required:true},
	maxTenants: {type:Number, required:true},
	tenants: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Tenant'}]
});

let Property;



propertySchema.statics.addTenantToProperty = function(propertyId,tenantId,cb){

	let propertyPromise = Property.findById(propertyId)
	.exec()

	//  if tenant already rents this propert, this will do nothing.
	let tenantPromise = Tenant.findByIdAndUpdate(tenantId,{property: propertyId}, {new:true})
	.exec()

	Promise.all([propertyPromise,tenantPromise])
	.then(function(propertyAndTenant){
		if (propertyAndTenant[0].tenants.length >= propertyAndTenant[0].maxTenants){
			return Promise.reject('Maximum tenants would be exceeded. Tenant not added.');
		}
		if (propertyAndTenant[0].tenants.indexOf(propertyAndTenant[1]._id) >= 0){
			return Promise.reject('Tenant already rents this property.');
		}
		else {
			propertyAndTenant[0].tenants.push(propertyAndTenant[1]._id);
			return propertyAndTenant[0].save()
		}
	})
	.then(function(savedProperty){
		cb(null,savedProperty);
	})
	.catch(function(err){
		cb(err);
	});
}



propertySchema.statics.removeTenantFromProperty = function(propertyId,tenantId,cb){

	let tenantPromise = Tenant.findById(tenantId)
	.exec()

	let propertyPromise = Property.findByIdAndUpdate(propertyId,{$pull: {tenants: tenantId}}, {new:true})
	.exec()

	Promise.all([propertyPromise,tenantPromise])
	.then(function(propertyAndTenant){
		propertyAndTenant[1].property = null;
		return propertyAndTenant[1].save()
	})
	.then(function(savedProperty){
		cb(null,savedProperty);
	})
	.catch(function(err){
		cb(err);
	});
}





Property = mongoose.model('Property', propertySchema);

module.exports = Property;

