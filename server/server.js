const server = require('http').createServer();
const socket = require('socket.io')(server);
const port = 8000;

const AllMessage = []

socket.on('connection', (client) => {
     console.log('USER ID =>', client.id)
     console.log('PPL CONNECTED => ', socket.engine.clientsCount);
    client.on('newMessage', data => {
      var decode =  Buffer.from(data.message, 'base64').toString();
      data.message = decode;
      AllMessage.push(data)
   client.broadcast.emit('ShowMessage', { TouslesMessages: AllMessage })
   })
    client.emit('userid', { userid : client.id});
    client.emit('counter', {'counter': socket.engine.clientsCount })
    client.broadcast.emit('new-connection', { "NewUser": client.id }  )
    client.on('disconnect', function()  {
        console.log('Socket disconnected !',client.id);
        client.broadcast.emit('LogoutSession', { 'logoutMessage': 'un utilisateur vient de se deconnecter' }  )
    });
})

server.listen(port, () =>  console.log('Server listening on port 8000'))
