let mongoose = require('mongoose');
mongoose.Promise = Promise;


let Property = mongoose.model('Property', {
	name: {type:String, required:true},
	rent: {type:Number, required:true},
	maxTenants: {type:Number, required:true},
	tenants: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Tenant'}]
});

module.exports = Property;

