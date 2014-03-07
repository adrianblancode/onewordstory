var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var wordSchema = new Schema({
    id : ObjectId,
    userId : { type: Schema.ObjectId, ref: 'UserModel', required: true},
    storyId : { type: Schema.StoryModel.ObjectId, required: true}
});

module.exports = mongoose.model('Storys', memberSchema);