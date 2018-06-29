const express = require('express');
// import { MongoClient } from 'mongodb'
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./Post');

const url = "mongodb://localhost:27017/mydb";

/**
 * Connect to database
 */
mongoose.connect(url);
  mongoose.connection.on('error', function () {
      console.log('Mongoose connection error');
  });
  mongoose.connection.once('open', function callback() {
      console.log("Mongoose connected to the database");
  });
  mongoose.Promise = global.Promise;

// Setting up body parser
const app = express();
app.use(bodyParser.json());


// Routes
app.get('/posts', (req, res) => {
    Post.find().exec(function(err, posts) {
        if (err) {
            console.error(err);
            res.status(500);
            res.send({'error': err});
        } else {
            res.send({posts: posts});
        }
    });
})

app.post('/posts', (req, res) => {
    const post = Post(req.body.post);
    post.save(function(err) {
        if (err) {
          res.send({error: err.message});
        } else {
            res.send('Success!');
        }
      });
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))

