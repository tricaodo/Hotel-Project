const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hotels', {useNewUrlParser: true});

const Room = require('./models/room');
const Comment = require('./models/comment');
const seedDB = require('./seeds');



const app = express();

app.use(bodyParser.urlencoded({extended: true}));

seedDB();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    Room.find({}, (error, rooms) => {
        if(error){
            console.log('Error from fetching hotels: ' + error);
        }else{
            res.render('rooms', {hotels: rooms});
        }
    })
})

app.post('/', (req, res) => {
    const name = req.body.name;
    const url = req.body.url;
    const desc = req.body.desc
    const newHotel = {name: name, image: url, desc: desc};
    Room.create(newHotel, (error, data) => {
        if(error){
            console.log('Error from creating room: ' + error);
        }else{
            console.log('Added room successfully');
        }
    });
    res.redirect('/');
})

app.get('/rooms/new', (req, res) => {
    res.render('rooms/new');
})

app.get('/rooms/:id', (req, res) => {
    const id = req.params.id;
    Room.findById(id).populate('comments').exec((error, room) => {
        if(error){
            console.log('Error from getting room id: ' + error);
        }else{
            res.render('rooms/show', {room: room});
        }
    })
})

// ======================
// COMMENTS ROUTES
// ======================

app.get('/rooms/:id/comments/new', (req, res) => {
    Room.findById(req.params.id).populate('comments').exec((error, room) => {
        if(error){
            console.log('Error from loading the roomID for comment: ' + error);
        }else{
            res.render('comments/new', {room: room});
        }
    })
    
});

app.post('/rooms/:id/comments', (req, res) => {
    const roomID = req.params.id;
    const newComment = {author: req.body.author, content: req.body.content};
    Room.findById(roomID, (error, room) => {
        if(error){
            console.log('Error from finding roomID: ' + error)
        }else{
            Comment.create(newComment, (error, comment) => {
                if(error){
                    console.log('Error from adding new comment: ' + error);
                }else{
                    room.comments.push(comment._id);
                    room.save();
                    console.log('Added comment successfully');
                    res.redirect('/rooms/' + roomID);
                }
            })
        }
    })
});

app.listen(3000, (error) => {
    if(error){
        console.log('Error: ' + error);
    }else{
        console.log('Server has started...');
    }
});