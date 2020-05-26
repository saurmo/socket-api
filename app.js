const express = require("express");

const app = express();
const http = require("http").createServer(app);

app.get("/", (req, res) => {
  return res.json({ mensaje: "Api de sockets" });
});

const { initSocket } = require("./services/sockets/sockets");
initSocket(http);

const PORT = process.env.PORT || 3001;
http.listen(PORT, () => {
  console.log(`API de sockets corriendo en http://localhost:${PORT}`);
});
