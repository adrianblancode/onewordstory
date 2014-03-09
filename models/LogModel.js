var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var logSchema = new Schema({
    id : ObjectId,
    userId : { type: Schema.ObjectId, ref: 'UserModel', required: true},
    date : {type: Date, default: Date.now},
    ip : {type: String, required: true}
});

module.exports = mongoose.model('Logs', logSchema);