const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
        
    },
    category:{
        type:String,
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    likes:[{type:ObjectId,
        ref:'User'}],
   
    }, {
        timestamps: true ,
        strict: false
    })
    
    if (! modelAlreadyDeclared()) {
        const Post = mongoose.model('Post', PostSchema)
      }
      
      function modelAlreadyDeclared() {
        try {
          mongoose.model('Post')  // it throws an error if the model is still not defined
          return true
        } catch (e) {
          return false
        }
    }


  // export default Post
   module.exports = mongoose.model('Post')

