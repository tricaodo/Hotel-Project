const express   = require('express');
const router    = express.Router();
const Comment   = require('../models/comment');
const Room   = require('../models/room');

router.get('/rooms/:id/comments/new', isLoggedIn, (req, res) => {
    Room.findById(req.params.id).populate('comments').exec((error, room) => {
        if(error){
            console.log('Error from loading the roomID for comment: ' + error);
        }else{
            res.render('comments/new', {room: room});
        }
    })
    
});

router.post('/rooms/:id/comments', isLoggedIn, (req, res) => {
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

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;