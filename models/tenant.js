let mongoose = require('mongoose');
mongoose.Promise = Promise;


let Tenant = mongoose.model('Tenant', {
	name: {type:String, required:true},
	property: {type:mongoose.Schema.Types.ObjectId, ref: 'Property'}
});

module.exports = Tenant;

