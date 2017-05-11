var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var detourSchema = new Schema({
	destination : {type: String},
  currentLocation : {type: String},
	detourReason : {type: String, required:true},
  date : {type : Date, default:Date.Now}
});

detourSchema.plugin(timestamps);

module.exports.detour = mongoose.model('detour', detourSchema);
