const express = require('express');
const bodyParser = require('body-parser');

const Room = require('./models/room');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

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
    const newHotel = {name: name, image: url};
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
    res.render('new');
})

app.get('/rooms/:id', (req, res) => {
    const id = req.params.id;
    Room.findById(id, (error, room) => {
        if(error){
            console.log('Error from getting room id: ' + error);
        }else{
            res.render('room', {room: room});
        }
    })
})

app.listen(3000, (error) => {
    if(error){
        console.log('Error: ' + error);
    }else{
        console.log('Server has started...');
    }
});