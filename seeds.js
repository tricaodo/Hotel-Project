const Room = require('./models/room');
const Comment = require('./models/comment');

const rooms = [
    {
        name: 'Single Room',
        image: 'https://media.istockphoto.com/photos/hotel-room-picture-id843823656?k=6&m=843823656&s=612x612&w=0&h=V0VaPkrXCwlnUqUBnJ62zXoKgIvc_g37JGArIpJRbrM=',
        desc: 'Room for two people with the beautiful view towards the lake Tahoe',
    },

    {
        name: 'Double Room',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrkICIvO7DCqe4fuPIXJ76rbK7vnTYJkGSJKXzhmFepy5ZyUsxA',
        desc: 'Room for two people with the beautiful view towards the lake Tahoe',
    },

    {
        name: 'Tripple Room',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRjJzD_IGTMqCitgRwA-AFE3E0vaUxtJuuCfiFGtdsrhCOYt6K',
        desc: 'Room for two people with the beautiful view towards the lake Tahoe',
    }
]
function seedDB(){
    Room.remove({}, (error) => {
        if(error){
            console.log('Error from delete rooms: ' + error);
        }
    });

    Comment.remove({}, (error) => {
        if(error){
            console.log('Error from delete comments: ' + error);
        }
    });
    
    rooms.forEach((seed) => {
        Room.create(seed, (error, room) => {
            if(error){
                console.log('Error from creating room: ' + error);
            }else{
                console.log('Added room successfully');
                Comment.create({author: 'Homer', content: 'You guys should visit this place once in your life.'}, (error, dataComment) => {
                    if(error){
                        console.log('Error from creating comments');
                    }else{
                        room.comments.push(dataComment);
                        room.save();
                        console.log('Added comment successfully');
                    }
                })
            }
        })
    })
}

module.exports = seedDB;
