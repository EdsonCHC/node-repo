//dependencias
const express = require("express");
const app = express();

//puerto
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchado el puerto ${port}`);
});

//manejar datos json
app.use(express.json);

//rutas DB
const getDb = () => {
  const filePath = path.join(__dirname, "db.json");
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

const saveDb = (db) => {
  const filePath = path.join(__dirname, "db.json");
  fs.writeFileSync(filePath, JSON.stringify(db, null, 2));
};

//ruta de prueba
app.get("/", (req, res) => {
  res.send("Hola mundoooooo");
});

//
app.get("/usuarios", (req, res) => {
  const db = getDb();
  res.json(db.usuarios);
});

//obtener usuario por id
app.get("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const db = getDb();
  const usuario = db.usuarios.find((user) => user.id === id);

  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).send("Usuario no encontrado");
  }
});

//crear
app.post("/usuarios", (res, req) => {
  const newUser = req.body;
  const db = getDb();
  const maxID = db.usuarios.reduce((max, user) => Math.max(max, user.id), 0);

  nuevoUsuario.id = maxId + 1;
  db.usuarios.push(nuevoUsuario);
  saveDb(db);

  res.status(201).json(nuevoUsuario);
});

// Actualizar un usuario
app.put("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const datosActualizados = req.body;
  const db = getDb();
  const index = db.usuarios.findIndex((user) => user.id === id);

  if (index !== -1) {
    db.usuarios[index] = { id, ...datosActualizados };
    saveDb(db);
    res.json(db.usuarios[index]);
  } else {
    res.status(404).send("Usuario no encontrado");
  }
});

// Eliminar un usuario
app.delete("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const db = getDb();
  const index = db.usuarios.findIndex((user) => user.id === id);

  if (index !== -1) {
    db.usuarios.splice(index, 1);
    saveDb(db);
    res.status(204).send(); // No content
  } else {
    res.status(404).send("Usuario no encontrado");
  }
});
