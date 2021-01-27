const mongoose = require('mongoose'),

 Schema = mongoose.Schema,
 ObjectId = Schema.ObjectId;

const CommentSchema = new Schema({

    post_id:{ type: ObjectId,ref:'Post'},
    email: { type: String },
    name: { type: String },
    comment: { type: String },
    timestamp: { type: Date, 'default': Date.now }
    });

    if (! modelAlreadyDeclared()) {
        const Comment = mongoose.model('Comment', CommentSchema)
      }
      
      function modelAlreadyDeclared() {
        try {
          mongoose.model('Comment')  // it throws an error if the model is still not defined
          return true
        } catch (e) {
          return false
        }
    }

module.exports =mongoose.model("Comment") 