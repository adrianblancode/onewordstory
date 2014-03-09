var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var storySchema = new Schema({
    storyid : {type : Number, required : true},
    title : { type: String, required: true},
    admin : { type: Schema.ObjectId, ref: 'UserModel', required: true}
});

module.exports = mongoose.model('Stories', storySchema);
