var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var storySchema = new Schema({
    id : ObjectId,
    title : { type: String, required: true},
    admin : { type: Schema.UserModel.ObjectId, required: true}
});

module.exports = mongoose.model('Storys', memberSchema);