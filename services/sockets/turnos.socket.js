const Turnos = require("../../controllers/turnos.controller");
const turnos = new Turnos();

const generarTurno = (socket) => {
  socket.on("generarTurno", (data, callback) => {
    // Logica para generar el turno
    let turno = turnos.generarTurno();
    callback(turno);
    estadoTurnosBroadcast(socket, {
      info: { actual: turnos.getTurnosEnAtencion(), turnos: turnos.getTurnos() },
    });
  });
};

const atenderTurno = (socket) => {
  socket.on("atenderTurno", (data, callback) => {
    if (!data.caja) {
      return callback({ ok: false, mensaje: "El número de la caja es obligatorio." });
    }
    // Logica para atender el turno
    let info = turnos.atenderTurno(data.caja);
    callback(info);
    estadoTurnosBroadcast(socket, info);
  });
};

const estadoTurnosBroadcast = (socket, info) => {
  socket.broadcast.emit("estadoTurnos", info);
};

const estadoTurnos = (socket) => {
  socket.emit("estadoTurnos", {
    ok: true,
    mensaje: "Turnos actuales",
    info: turnos.getTurnos(),
  });
};

module.exports = { generarTurno, atenderTurno, estadoTurnos };
