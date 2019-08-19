const express    = require('express');
const router     = express.Router();
const User       = require('../models/user');
const passport   = require('passport');

router.get('/signup', (req, res) => {
    res.render('user/signup');
});

router.post('/signup', (req, res) => {
    User.register({username: req.body.username}, req.body.password, (error, user) => {
        if(error){
            console.log('Error from Sign Up: ' + error);
            return res.redirect('/');
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect('/');
        })
    });
});

router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signup'
}), (req, res) => {
    
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;