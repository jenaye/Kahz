const server = require('http').createServer();
const socket = require('socket.io')(server);

const AllMessage = []
/*
on watch les connexions
 */
socket.on('connection', (client) => {
    console.log('ID de l\'utilisateur connecter =>', client.id)
    /*
    quand l'user envoi un message on recupere et on stock dans un tableau
     */
    client.on('newMessage', data => {
        AllMessage.push(data)
        client.broadcast.emit('ShowMessage', { TouslesMessages: AllMessage } )
    })
    client.emit('userid', { userid : client.id});
  //   socket.broadcast.emit('new-connection', { "NewUser": client.id }  ) 
})



server.listen(8000, () =>  console.log('API listening on port 8000'))
