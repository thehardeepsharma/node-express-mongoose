require('./Connection');

// User schema

var User = new Schema({
  username    : { type : String, default : '', required : true },
  articles    : [{ type: Schema.ObjectId, ref: 'Article' }],
  created_at  : { type : Date, default : Date.now }
});

var exports = module.exports = mongoose.model('User', User);
