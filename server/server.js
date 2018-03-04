const server = require('http').createServer();
const socket = require('socket.io')(server);
var log4js = require('log4js');
var logger = log4js.getLogger();
const port = 8000;

logger.level = 'debug';

const AllMessage = []

socket.on('connection', (client) => {
  logger.debug(`User id :  ${client.id}`)
  logger.info(`people counter :${socket.engine.clientsCount}`);
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
    logger.warn(`User :  ${client.id} just left the chat`);
    client.broadcast.emit('LogoutSession', { 'logoutMessage': 'user just logout' }  )
  });
})

server.listen(port, () => logger.debug(`Server listening on port ${port}`))
