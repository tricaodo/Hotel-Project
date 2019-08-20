const express   = require('express');
const Room      = require('../models/room');
const router    = express.Router();
router.get('/', (req, res) => {
    Room.find({}, (error, rooms) => {
        if(error){
            console.log('Error from fetching hotels: ' + error);
        }else{
            res.render('rooms', {hotels: rooms});
        }
    })
})

router.post('/rooms/new', isLoggedIn, (req, res) => {
    const name = req.body.name;
    const url = req.body.url;
    const desc = req.body.desc
    const newHotel = {name: name, image: url, desc: desc};
    Room.create(newHotel, (error, data) => {
        if(error){
            console.log('Error from creating room: ' + error);
        }else{
            data.author.id = req.user._id;
            data.author.username = req.user.username;
            data.save();
            console.log('Added room successfully');
        }
    });
    res.redirect('/');
})

router.get('/rooms/new', isLoggedIn, (req, res) => {
    res.render('rooms/new');
})

router.get('/rooms/:id', (req, res) => {
    const id = req.params.id;
    Room.findById(id).populate('comments').exec((error, room) => {
        if(error){
            console.log('Error from getting room id: ' + error);
        }else{
            res.render('rooms/show', {room: room});
        }
    })
})

router.get('/rooms/:id/edit', (req, res) => {
    Room.findById(req.params.id, (error, room) => {
        if(error){
            console.log('Error from editing room: ' + error);
        }else{
            res.render('rooms/edit', {room: room});
        }
    });
})

router.put('/rooms/:id', (req, res) => {
    Room.findByIdAndUpdate(req.params.id, req.body.room, {useFindAndModify: false},(error, room) => {
        if(error){
            console.log('Error from updating room: ' + error);
        }else{
            res.redirect(/rooms/ + room._id);
        }
    })
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}
module.exports = router;
