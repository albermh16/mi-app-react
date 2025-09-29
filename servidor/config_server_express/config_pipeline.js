//modulo de codigo para condigurar la PEPELINE del servidor web express
//va a exportar una duncion que recibe como paramentro el objeto servidor wev express desde el modulo server.js
//y dentro de la funcion se configuran los middlewares y demas elementor de la pipelie del servidor web express

const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

module.exports = (serverExpress) => {
  //confuguraremos la pepeline del servidor web express, cada modulo middleware se encarde de una tarea concreta
  //Son un duncion javascripr qeu recibe 3 paramentros:
  //1. request: objero que se represente la peticion http que hace el client al seridor si es el primero en la pepeline
  //              si no represnta el objeto requestmodificado por el middleware anterior.
  //2. response: objeto que representa la respuesta http que el servidor web express va a enviar al cliente.
  //3. next: funcion qeu se debe invocar para pasar el control al siguiente diddleware en la pipeline
  /**
   *
   *
   *
   */

  //1. Procesamiento de cookies
  console.log(`la variable cookieParser contiene ${cookieParser}`);
  serverExpress.use(cookieParser());

  //2.
  console.log(`el valor de la funcion express.json es: ${express.json}`);
  serverExpress.use(express.json());

  //3.
  serverExpress.use(express.urlencoded({ extended: false }));

  //4. CORS
  console.log(`el calor de la funcion cors es: ${cors}`);
  serverExpress.use(cors());

  serverExpress.use("/api/Cliente/Registro", async (req, res, next) => {
    try {
      console.log(
        `datos mandados en el body por el cliente REACT desde e lcomponente Registro.js: ${JSON.stringify(
          req.body
        )}`
      );
      await mongoose.connect("mongodb://127.0.0.1:27017/HSN");
      //Lanzo INSERT usando mongoose como si fuera una query normal ejecutada contra mengodb en la shell...sin usar ESQUEMAS-MODELO
      let resInsert = await mongoose.connection
        .collection("clientes")
        .insertOne({
          nombre: req.body.nombre,
          apellidos: req.body.apellidos,
          genero: req.body.genero,
          cuenta: {
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10), //<---- Haseamos la password
            cuentaActivada: false,
            imagenAvatar: "",
            fechaCreacionCuenta: new Date(),
          },
          direccion: [],
          pedidos: [],
          listaFavoritos: [],
          pedidoActual: {},
          metodosPago: [],
        });

      console.log(
        `la operacion de registro de cliente ha ido bien: ${JSON.stringify(
          resInsert
        )}`
      );
      //--------2ยบ paso, enviar email de activacion de cuenta al cliente

      //--------3ยบ paso, enviar respuesta al cliente REACT
      res
        .status(200)
        .send({ codigo: 0, mensaje: "ok desde el servidor web express" });
    } catch (error) {
      console.error("Error en el registro de cliente:", error);
      res.status(500).send({ codigo: 1, mensaje: "Error en el servidor" });
    }
  });
};