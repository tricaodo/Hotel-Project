const express       = require('express');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const passport      = require('passport');
const localStrategy = require('passport-local');

mongoose.connect('mongodb://localhost/hotels', {useNewUrlParser: true});
const User    = require('./models/user');
const seedDB  = require('./seeds');

// REQUIRING ROUTES
const roomRoute      = require('./routes/rooms');
const authRoute      = require('./routes/auth');
const commentRoute   = require('./routes/comments');

const app = express();
app.use(require('express-session')({
    secret: 'my name is tri do',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.use(roomRoute);
app.use(authRoute);
app.use(commentRoute);

app.set('view engine', 'ejs');
seedDB();

app.listen(3000, (error) => {
    if(error){
        console.log('Error: ' + error);
    }else{
        console.log('Server has started...');
    }
});
