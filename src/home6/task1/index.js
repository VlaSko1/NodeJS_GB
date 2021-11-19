const io = require('socket.io')
const app = require('./app');
const { v4: uuidv4 } = require('uuid');

const socketServer = io(app);

const DATABASE = {
    storage: {},
    async saveUser(data) {
        await new Promise(resolve => setTimeout(resolve, 500));
        this.storage[data.payload.username] = data.payload;
    }
};

const SOCKET_BASE = {
    storage: [],
    addSocket(id, socketId) {
        this.storage.push({secretId: id, socketId, connect: true});
        return;
    },
    checkSecretId(id) {
        return this.storage.some((el) => el.secretId === id);
    },
    getSecretId(id) {
        let elem = this.storage.find((el) => el.socketId === id);
        if (!elem) return null;
        return elem.secretId;
    },
    delElemBySecretId(id) {
        let indDelElem = this.storage.findIndex((el) => el.secretId === id);
        this.storage.splice(indDelElem, 1);
    },
    rewriteSocketId(secretId, socketId) {
        let elem = this.storage.find((el) => el.secretId === secretId);
        if (elem) {
            elem.socketId = socketId;
            elem.connect = true;
        } 
    },
    setDisconnect(secretId) {
        let elem = this.storage.find((el) => el.secretId === secretId);
        elem.connect = false;
    },
    getConnectStatus(secretId) {
        let elem = this.storage.find((el) => el.secretId === secretId);
        return elem.connect;
    }
}

socketServer.on('connection', function (socket) {
    console.log('Connection', socket.id, );
    
    
        
    socket.on('connect_user', (data) => {
        
        if (!SOCKET_BASE.checkSecretId(data.id)) {
            socket.broadcast.emit('SERVER_MSG', { msg: `User with id: ${data.id} - connecting to chat`,});
            SOCKET_BASE.addSocket(data.id, data.socketId);
        } else {
            SOCKET_BASE.rewriteSocketId(data.id, data.socketId)
            socket.broadcast.emit('SERVER_MSG', { msg: `User with id: ${data.id} - reconnecting to chat`,});
        }
    });

   
    console.log('Key', SOCKET_BASE.storage);

    socket.on('CLIENT_MSG', (data) => {

        socketServer.emit('SERVER_MSG', {msg: data.msg});
    });


    socket.on('disconnect', () => {
        
        let secretId = SOCKET_BASE.getSecretId(socket.id);

        SOCKET_BASE.setDisconnect(secretId);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!SOCKET_BASE.getConnectStatus(secretId)) {
                    SOCKET_BASE.delElemBySecretId(secretId);
                    socket.broadcast.emit('SERVER_MSG', { msg: `User with id: ${secretId} - disconnecting from chat`,});
                }
                resolve;
            }, 1000)
        })
         
    });

});


app.listen(3030, () => {
    console.log('Server started on port 3030');
});


