var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    id : ObjectId,
    username : { type: String, required: true},
    color : { type: String, required: true},
    password : { type: String, required: true},
    salt : { type: String, required: true }
});

module.exports = mongoose.model('Users', userSchema);