//modulo de codigo para condigurar la PEPELINE del servidor web express
//va a exportar una duncion que recibe como paramentro el objeto servidor wev express desde el modulo server.js
//y dentro de la funcion se configuran los middlewares y demas elementor de la pipelie del servidor web express


const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

module.exports = (serverExpress) => {
  //configuraremos la pipeline del servidor web express, cada modulo middleware se encarde de una tarea concreta
  //Son un duncion javascripr qeu recibe 3 paramentros:
  //1. request: objeto que se represente la peticion http que hace el client al seridor si es el primero en la pepeline
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

  
};