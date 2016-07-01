let mongoose = require('mongoose');

let tenantSchema = {
	name: {type:String, required:true},
	email: {type:String, required:true},
	phone: {type:String, required:true},
	property: {type:mongoose.Schema.Types.ObjectId, ref: 'Property'}
};

let Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = Tenant;

