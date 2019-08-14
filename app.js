const express = require('express');
const app = express();



app.set('view engine', 'ejs');
app.get('/', (_,res) => {
    const hotels = 
[
    {name: 'Salmon Creek', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80'},
    {name: 'Granite Hill', image: 'https://images.unsplash.com/photo-1531835551805-16d864c8d311?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'},
    {name: 'Mountain Rest', image: 'https://wshr.global.ssl.fastly.net/CrsMedia/P13763/rm/RD_102_Wynn_Deluxe_Panorama_Room_Barbara_Kraft.jpg?tag=n_2_tile'},
    {name: 'Yosemite', image: 'https://www.theritzlondon.com/wp-content/uploads/2016/10/superior-king.jpg'},
]
    res.render('landing', {hotels: hotels});
})

app.listen(3000, (error) => {
    if(error){
        console.log('Error: ' + error);
    }else{
        console.log('Server has started...');
    }
})