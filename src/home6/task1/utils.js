const SOCKET_BASE = {
  storage: [],
  addSocket(id, socketId, name) {
      this.storage.push({secretId: id, socketId, connect: true, name});
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
  },
  getNameBySecretId(secretId) {
      let elem = this.storage.find((el) => el.secretId === secretId);
      return elem.name;
  }
}

module.exports = SOCKET_BASE;