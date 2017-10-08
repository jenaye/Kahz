const server = require('http').createServer();
const socket = require('socket.io')(server);

const AllMessage = []

socket.on('connection', (client) => {
   console.log('ID de l\'utilisateur connecter =>', client.id)
   console.log(socket.engine.clientsCount);
   client.on('newMessage', data => {
      AllMessage.push(data)
      client.broadcast.emit('ShowMessage', { TouslesMessages: AllMessage })
   })
   client.emit('userid', { userid : client.id});
   client.emit('counter', {'counter': socket.engine.clientsCount })
   client.broadcast.emit('new-connection', { "NewUser": client.id })
})

server.listen(8000, () =>  console.log('API listening on port 8000'))
