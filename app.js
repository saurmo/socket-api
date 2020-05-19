const express = require("express");
const app = express();

app.get("/", (req, res) => {
  return res.json({ mensaje: "Api de sockets" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API de sockets corriendo en http://localhost:${PORT}`);
});
