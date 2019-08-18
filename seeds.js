const Room = require('./models/room');
const Comment = require('./models/comment');

const rooms = [
    {
        name: 'Single Room',
        image: 'https://media.istockphoto.com/photos/hotel-room-picture-id843823656?k=6&m=843823656&s=612x612&w=0&h=V0VaPkrXCwlnUqUBnJ62zXoKgIvc_g37JGArIpJRbrM=',
        desc: 'I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful',
    },

    {
        name: 'Double Room',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrkICIvO7DCqe4fuPIXJ76rbK7vnTYJkGSJKXzhmFepy5ZyUsxA',
        desc: 'I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful',
    },

    {
        name: 'Tripple Room',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRjJzD_IGTMqCitgRwA-AFE3E0vaUxtJuuCfiFGtdsrhCOYt6K',
        desc: 'I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful',
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
                Comment.create({author: 'Homer', content: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.'}, (error, dataComment) => {
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
