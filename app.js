const express = require("express");
const SocketIO = require("socket.io");

const app = express();
const http = require("http").createServer(app);

app.get("/", (req, res) => {
  return res.json({ mensaje: "Api de sockets" });
});

const io = SocketIO(http);

io.on("connection", (socket) => {
  console.log("Un usuario se ha conectado al socket");

  socket.on("nuevo usuario", (data, callback) => {
    console.log("Escucho el evento de un nuevo usuario", data);
    callback();

    socket.broadcast.emit("nuevo usuario", data);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});

const PORT = process.env.PORT || 3001;
http.listen(PORT, () => {
  console.log(`API de sockets corriendo en http://localhost:${PORT}`);
});
