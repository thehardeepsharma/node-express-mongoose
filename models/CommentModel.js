require('./Connection');

// comment schema

var Comments = new Schema({
  fullname    : {type : String, default : ''},
  body        : {type : String, default : ''},
  article     : {type: Schema.ObjectId, ref: 'Article'},
  created_at  : {type : Date, default : Date.now},
  updated_at  : {type : Date, default : Date.now}
});

var exports = module.exports = mongoose.model('Comment', Comments);
