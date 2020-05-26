const SocketIO = require("socket.io");
const turnos = require("./turnos.socket");
const initSocket = (http) => {
  const io = SocketIO(http);
  io.on("connection", (socket) => {
    console.log("Un usuario se ha conectado al socket");

    // Escuchadores
    nuevoUsuario(socket);
    desconectarUsuario(socket);
    turnos.generarTurno(socket);
    turnos.atenderTurno(socket);

    //Emisores
    turnos.estadoTurnos(socket);
  });
};

const nuevoUsuario = (socket) => {
  socket.on("nuevo usuario", (data, callback) => {
    console.log("Escucho el evento de un nuevo usuario", data);
    callback();
    socket.broadcast.emit("nuevo usuario", data);
  });
};

const desconectarUsuario = (socket) => {
  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
};

module.exports = { initSocket };
