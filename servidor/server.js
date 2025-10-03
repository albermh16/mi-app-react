// modulo de codigo de entrada del proyecto nodejs, configuramos servidor web express
const configExpress = require("express"); //<------- en variable configExpress se almacena funcion de configurcion servidor web que se exporta en modulo express
const configPipeline = require("./config_server_express/config_pipeline")
const clienteRouter = require("./routes/clientes.js");


const serverExpress = configExpress();//<----- ejecutamos la funcion de configuracion del servidor web express y almacenamos el resultado en variable
const PORT = 3000;
configPipeline(serverExpress);

//montar las rutas del cliente
serverExpress.use("/api/Cliente", clienteRouter);

// Arrancar el servidor
serverExpress.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});