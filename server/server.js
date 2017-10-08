const server = require('http').createServer();
const socket = require('socket.io')(server);

const AllMessage = []

socket.on('connection', (client) => {
   console.log('USER ID =>', client.id)
   console.log('PPL CONNECTED => ', socket.engine.clientsCount);
   client.on('newMessage', data => {
   console.log('encrypted base64 message => ', data.message);
   var decode =  Buffer.from(data.message, 'base64').toString();
   data.message = decode;
   AllMessage.push(data)
   client.broadcast.emit('ShowMessage', { TouslesMessages: AllMessage })
   })
   client.emit('userid', { userid : client.id});
   client.emit('counter', {'counter': socket.engine.clientsCount })
   client.broadcast.emit('new-connection', { "NewUser": client.id })
})

server.listen(8000, () =>  console.log('Server listening on port 8000'))
