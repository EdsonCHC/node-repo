const express = require("express");
const app = express();

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchado el puerto ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hola mundoooooo");
});
