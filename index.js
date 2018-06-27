const express = require('express');
// import { MongoClient } from 'mongodb'
const MongoClient = require('mongodb').MongoClient; 
const ObjectId = require('mongodb').ObjectId;
const bodyParser = require('body-parser');

const url = "mongodb://localhost:27017/mydb";

// Connecting to the database
let db; 
MongoClient.connect(url, (err, client) => {
    if (err) throw err;
    console.log('Database created!');
    db = client.db('mydb');
})

// Setting up body parser
const app = express();
app.use(bodyParser.json());


// Routes
app.get('/posts', (req, res) => {
    db.collection('posts').find({}).toArray((err, items) => {
        if (err) {
            console.error(err);
            res.status(500);
            res.send({'error': err});
        } else {
            res.send({posts: items});
        }
    })
})

app.post('/posts', (req, res) => {
    // Go to database, and create new post
    db.collection('posts').save(req.body.post, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500);
            res.send({'error': err});
        } else {
            console.log('saved to database');
            res.send(result);
        }
    })
})

app.get('/posts/:id', (req, res) => {
    db.collection('posts').find({_id: ObjectId(req.params.id)}).toArray((err, items) => {
        if (err) {
            console.error(err);
            res.status(500);
            res.send({'error': err});
        } else {
            res.send({post: items[0]});
        }
    })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))

