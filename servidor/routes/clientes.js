const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

router.post("/Registro", async (req, res, next) => {
    try {
        console.log(
            `datos mandados en el body por el cliente REACT desde e lcomponente Registro.js: ${JSON.stringify(
                req.body
            )}`
        );

        await mongoose.connect("mongodb+srv://albermh16:Madrid2024@tienda-hsn.kugffbq.mongodb.net/HSN");

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
        res.status(200).send({ codigo: 0, mensaje: "Registro correcto" });
    } catch (error) {
        console.error("Error en el registro de cliente:", error);
        res.status(500).send({ codigo: 1, mensaje: "Error en el servidor" });
    }
});

// LOGIN

router.post("/Login", async (req, res, next) => {
    try {
        console.log(
            `datos mandados en el body por el cliente REACT desde e lcomponente Login.js: ${JSON.stringify(
                req.body
            )}`
        );

        await mongoose.connect("mongodb+srv://albermh16:Madrid2024@tienda-hsn.kugffbq.mongodb.net/HSN");

        const user = await mongoose.connection
            .collection("clientes")
            .findOne({ "cuenta.email": req.body.email }); //<---- Buscamos el usuario por email

        if (!user) {
            // Si no se encuentra el usuario, enviamos un error
            return res.status(401).send({ codigo: 1, mensaje: "Usuario o contraseña incorrectos" });
        }

        // Comparamos la contraseña proporcionada con la almacenada en la base de datos
        const valido = bcrypt.compareSync(req.body.password, user.cuenta.password);
        if (!valido) {
            // Si la contraseña no es válida, enviamos un error
            return res.status(401).send({ codigo: 1, mensaje: "Usuario o contraseña incorrectos" });
        }
        // Si todo es correcto, enviamos una respuesta de éxito
        res.status(200).send({ codigo: 0, mensaje: "Login correcto" });
    } catch (error) {
        console.error("Error en el login de cliente:", error);
        res.status(500).send({ codigo: 2, mensaje: "Error en el servidor" });
    }
});

module.exports = router;

