const server = require('http').createServer();
const socket = require('socket.io')(server);

const AllMessage = []
/*
on watch les connexions
 */
socket.on('connection', (client) => {
    console.log('ID de l\'utilisateur connecter =>', client.id)
    client.on('newMessage', data => {
        AllMessage.push(data)
        client.broadcast.emit('ShowMessage', { TouslesMessages: AllMessage } )
    })
    client.emit('userid', { userid : client.id});
    client.broadcast.emit('new-connection', { "NewUser": client.id }  )
})



server.listen(8000, () =>  console.log('API listening on port 8000'))
