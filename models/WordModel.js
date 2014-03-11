var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var wordSchema = new Schema({
    userId : { type: Schema.ObjectId, ref: 'UserModel', required: true},
    storyId : { type: Schema.ObjectId, ref: 'StoryModel', required: true},
    data : {type: String, required: true},
    color : {type : String, default: '0000ff'},
    timestamp : {type: Date, default: Date.now}
});

module.exports = mongoose.model('Words', wordSchema);
