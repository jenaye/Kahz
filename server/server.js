const server = require('http').createServer();
const socket = require('socket.io')(server);

const AllMessage = []
/*
on watch les connexions
 */
socket.on('connection', (client) => {
    console.log('New session =>', client.id)
    client.on('newMessage', data => {
        AllMessage.push(data)
        client.broadcast.emit('ShowMessage', { TouslesMessages: AllMessage } )
    })
    client.emit('userid', { userid : client.id});
    client.emit('counter', {'counter': socket.engine.clientsCount })
    client.broadcast.emit('new-connection', { "NewUser": client.id }  )
    client.on('disconnect', function()  {
        console.log('Socket disconnected !',client.id);
        client.broadcast.emit('LogoutSession', { 'logoutMessage': 'un utilisateur vient de se deconnecter' }  )
    });
})



server.listen(8000, () =>  console.log('API listening on port 8000'))
