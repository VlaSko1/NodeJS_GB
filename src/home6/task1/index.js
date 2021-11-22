const io = require('socket.io')
const app = require('./app');
const faker = require('faker');
const SOCKET_BASE = require('./utils');

const socketServer = io(app);

socketServer.on('connection', function (socket) {
            
    socket.on('connect_user', (data) => {
        
        if (!SOCKET_BASE.checkSecretId(data.id)) {
            let name = faker.name.firstName();
            socket.broadcast.emit('SERVER_MSG', { msg: `${name} - connecting to chat`,});
            SOCKET_BASE.addSocket(data.id, data.socketId, name);
        } else {
            SOCKET_BASE.rewriteSocketId(data.id, data.socketId);
            let name = SOCKET_BASE.getNameBySecretId(data.id);
            socket.broadcast.emit('SERVER_MSG', { msg: `${name} - reconnecting to chat`,});
        }
    });

    socket.on('CLIENT_MSG', (data) => {
        let name = SOCKET_BASE.getNameBySecretId(data.id);
        socketServer.emit('SERVER_MSG', {msg: `${name}: ${data.msg}`});
    });

    socket.on('disconnect', () => {
        
        let secretId = SOCKET_BASE.getSecretId(socket.id);

        SOCKET_BASE.setDisconnect(secretId);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!SOCKET_BASE.getConnectStatus(secretId)) {
                    let name = SOCKET_BASE.getNameBySecretId(secretId);
                    SOCKET_BASE.delElemBySecretId(secretId);
                    socket.broadcast.emit('SERVER_MSG', { msg: `${name} - disconnecting from chat`,});
                }
                resolve;
            }, 1000)
        })
         
    });

});

app.listen(3030, () => {
    console.log('Server started on port 3030');
});