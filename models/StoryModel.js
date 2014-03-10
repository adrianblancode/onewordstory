var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var storySchema = new Schema({
    title : { type: String, required: true, unique: true},
    admin : { type: Schema.ObjectId, ref: 'UserModel', required: true}
});

module.exports = mongoose.model('Stories', storySchema);
