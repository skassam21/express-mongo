const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String
    },
    comments: [{
        content: {
            type: String
        }
    }]
  },
  {
    timestamps: true
  });
  
  
  module.exports = mongoose.model('posts', PostSchema);