var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    username : { type: String, required: true},
    colors : { type: String, required: true},
    password : { type: String, required: true},
    salt : { type: String, required: true }
});

module.exports = mongoose.model('Users', userSchema);