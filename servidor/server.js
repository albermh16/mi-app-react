// modulo de codigo de entrada del proyecto nodejs, configuramos servidor web express
const configExpress = require("express"); //<------- en variable configExpress se almacena funcion de configurcion servidor web que se exporta en modulo express
const cors = require("cors");
const configPipeline = require("./config_server_express/config_pipeline")




const serverExpress = configExpress();//<----- ejecutamos la funcion de configuracion del servidor web express y almacenamos el resultado en variable
const PORT = 3000;
configPipeline(serverExpress);

// Permitir peticiones desde cualquier origen
//serverExpress.use(cors());

// Middleware para entender JSON en las peticiones
//serverExpress.use(express.json());

// Ruta de prueba
/*
serverExpress.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

// Endpoint para registro
serverExpress.post("/api/Cliente/Registro", (req, res) => {
  console.log("Datos recibidos:", req.body);
  res.json({ status: "ok", message: "Usuario registrado correctamente" });
});
*/

// Arrancar el servidor
serverExpress.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});