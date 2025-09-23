const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Permitir peticiones desde cualquier origen
app.use(cors());

// Middleware para entender JSON en las peticiones
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

// Endpoint para registro
app.post("/api/registro", (req, res) => {
  console.log("Datos recibidos:", req.body);
  res.json({ status: "ok", message: "Usuario registrado correctamente" });
});

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});