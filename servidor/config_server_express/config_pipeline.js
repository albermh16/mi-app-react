// modulo de codigo de entrada para configurar la PIPELINE del servidor web express
// exportamos una funcion que recibe como parametro el objeto servidor web express desde el modulo server.js
// y dentro de la funcion se configuran los middlewares y demas elementos de la pipeline del servidor web express

const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");

module.exports=(serverExpress)=>{
    // configuramos la pipeline del servidor web express
    // son una funcion js que recibe tres parametros:
    //1. request: objeto que representa la peticion http que hace el cliente al servidor si es el primero en la pipeline
    //              si no representa el objeto req modificado por el middleware anterior
    //2. response: objeto que representa la respuesta http que el servidor web express va a enviar al cliente
    //3. next: funcuon que debe invocar para pasar el control al siguiente middleware en la pipeline

    //para añadir un middleware a la pipeline del servidor express se usa el metodo .use([/ruta] funcion_middlware) del objeto servidor express
    //--- funciones middleware para todas las rutas o endpoints del servidor, las globales que siempre actuan

    //1. procesamiento de cookies, extraer de cabecera http_request la cabecera cookie y meterla en objeto req.cookies
    serverExpress.use(cookieParser());
    //2. procesamiento de datos json en el body de la peticion http_request y lo mete en prop.body del objeto request: req
    serverExpress.use(express.json());
    //3. procesamiento de datos en la url pasados por GET en la peticion http_request y los mete en prop.query del objeto request: req.query
    serverExpress.use(express.urlencoded({extended: false}));
    //4. procesamiento de peticiones desde todos los origenes
    serverExpress.use(cors());
    
    serverExpress.use("/api/Cliente/Login", (req,res,next)=>{
        console.log("datos mandados en el body por el registro:", req.body)
        res.status(200).send({codigo:0, mensaje:`datos recibidos ok..`});
    });
    
        
}